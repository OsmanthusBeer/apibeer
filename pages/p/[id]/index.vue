<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const route = useRoute()
const id = route.params.id as string

const toast = useToast()

// Fetch project
const { $client } = useNuxtApp()
const { pending, error, data: project } = $client.protected.projectShow.useQuery({
  id,
})

// Model: delete
const isOpenModelDelete = ref(false)
const form = ref<Form<Schema>>()
const state = ref({
  name: '',
})
const schema = z.object({
  name: z.string(),
})
type Schema = z.output<typeof schema>

const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name } = event.data
  if (name !== project.value?.name) {
    return form.value?.setErrors([
      { path: 'name', message: 'Project name is not match' },
    ])
  }

  try {
    await $client.protected.projectDelete.mutate({ id })
    toast.add({ title: 'Project deleted', color: 'green' })
    navigateTo('/dashboard')
  }
  catch (error: any) {
    toast.add({ title: error.message, color: 'red' })
  }
}
</script>

<template>
  <div v-if="pending">
    <USkeleton class="h-4 w-[250px]" />
  </div>
  <UAlert
    v-else-if="error"
    title="Fetch project error" icon="i-heroicons-x-circle-solid"
    color="red" variant="outline"
  >
    <template #description>
      {{ JSON.stringify(error) }}
    </template>
  </UAlert>
  <template v-else-if="project">
    <p>Project Id: {{ id }}</p>
    <p>Project Name: {{ project.name }}</p>
    <p>Project Description: {{ project.description }}</p>
    <p>Project Visibility: {{ project.visibility }}</p>

    <div class="mt-8 flex gap-4">
      <UButton @click="navigateTo(`/p/${id}/edit`)">
        Edit
      </UButton>
      <UButton color="red" @click="isOpenModelDelete = true">
        Delete
      </UButton>
    </div>

    <!-- TODO: Abstract `BasicConfirmModal` component -->
    <UModal v-model="isOpenModelDelete">
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Delete Confirm
            </h3>
            <UButton
              color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenModelDelete = false"
            />
          </div>
        </template>
        <UForm
          ref="form" class="mt-4 space-y-4"
          :state="state" :schema="schema"
          @submit="onSubmit"
        >
          <UFormGroup label="Project Name" name="name">
            <UInput v-model="state.name" placeholder="Input project name" />
          </UFormGroup>
          <div class="flex justify-end gap-4">
            <UButton color="gray" variant="solid">
              Cancel
            </UButton>
            <UButton type="submit" :loading="submiting">
              Confrim
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </template>
</template>
