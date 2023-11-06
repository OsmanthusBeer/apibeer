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

const form = ref<Form<Schema>>()
const schema = z.object({
  name: z.string(),
  description: z.string(),
  visibility: z.enum(['private', 'public']),
})
type Schema = z.output<typeof schema>

const submitting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, description, visibility } = event.data
  submitting.value = true
  try {
    await $client.protected.projectUpdate.mutate({
      id,
      name,
      description,
      // TODO: type
      visibility: visibility.toUpperCase() as any,
    })
    toast.add({ title: 'Project updated', color: 'green' })
    // TODO: navigateBack?
    navigateTo(`/dashboard/t/${project.value?.teamId}`)
  }
  catch (error) {
    const zodError = getZodError<Schema>(error)
    if (zodError) {
      const errors = Object.entries(zodError.fieldErrors).map(([path, messages]) => ({ path, message: messages.join('\n') }))
      form.value?.setErrors(errors)
      return
    }
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    console.error(error)
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    submitting.value = false
  }
}

const deleting = ref(false)
async function onDelete() {
  deleting.value = true
  try {
    await $client.protected.projectDelete.mutate({
      id,
    })
    toast.add({ title: 'Project deleted', color: 'green' })
    navigateTo(`/dashboard/t/${project.value?.teamId}`)
  }
  catch {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    console.error(error)
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    deleting.value = false
  }
}
</script>

<template>
  <div class="p-8">
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
      <UForm
        ref="form" class="mt-4 space-y-4"
        :state="project" :schema="schema"
        @submit="onSubmit"
      >
        <UFormGroup label="Name" name="name">
          <input v-model="project.name" class="input input-sm input-bordered" placeholder="Name">
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="project.description" placeholder="Description" />
        </UFormGroup>
        <UFormGroup label="Visibility" name="visibility">
          <URadio v-model="project.visibility" label="Private" value="private" help="You choose who can see and edit to this project" />
          <URadio v-model="project.visibility" label="Public" value="public" help="Anyone on the internet can see this project" />
        </UFormGroup>
        <div class="flex justify-end gap-4">
          <button class="btn btn-sm btn-error" :loading="deleting" @click="onDelete">
            Delete
          </button>
          <button class="btn btn-sm btn-neutral" type="submit" :loading="submitting">
            Submit
          </button>
        </div>
      </UForm>
    </template>
  </div>
</template>
