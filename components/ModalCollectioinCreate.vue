<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const props = defineProps<{
  projectId: string
}>()
const emit = defineEmits<{
  (event: 'success'): void
}>()

const modelValue = defineModel<boolean>({ default: false })

const { $client } = useNuxtApp()
const toast = useToast()

const form = ref<Form<Schema>>()
const state = ref({
  name: '',
})
const schema = z.object({
  name: z.string().min(1),
})
type Schema = z.output<typeof schema>

const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    submiting.value = true
    await $client.protected.collectionCreate.mutate({
      projectId: props.projectId,
      name: event.data.name,
    })
    toast.add({ title: 'Collection Create', color: 'green' })
    modelValue.value = false
    emit('success')
  }
  catch (error: any) {
    toast.add({ title: error.message, color: 'red' })
  }
  finally {
    submiting.value = false
  }
}
</script>

<template>
  <UModal v-model="modelValue">
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
            Create Collection
          </h3>
          <UButton
            color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="modelValue = false"
          />
        </div>
      </template>
      <UForm
        ref="form" class="mt-4 space-y-4"
        :state="state" :schema="schema"
        @submit="onSubmit"
      >
        <UFormGroup label="Collection Name" name="name">
          <UInput v-model="state.name" placeholder="Input collection name" autofocus />
        </UFormGroup>
        <div class="flex justify-end gap-4">
          <UButton color="gray" variant="solid" @click="modelValue = false">
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
