<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const { $client } = useNuxtApp()
const toast = useToast()

const route = useRoute()
const teamId = route.query.tid as string

const form = ref<Form<Schema>>()
const state = ref({
  name: '',
  description: '',
  visibility: 'private' as 'private' | 'public',
})
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
    await $client.protected.projectCreate.mutate({
      name,
      description,
      teamId,
      // TODO: type
      visibility: visibility.toUpperCase() as any,
    })
    navigateTo(`/dashboard/t/${teamId}`)
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
</script>

<template>
  <div class="p-8">
    <h1>Project Create</h1>

    <UForm
      ref="form" class="mt-4 space-y-4"
      :state="state" :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup label="Name" name="name">
        <input v-model="state.name" class="input input-sm input-bordered" placeholder="Name">
      </UFormGroup>
      <UFormGroup label="Description" name="description">
        <UTextarea v-model="state.description" placeholder="Description" />
      </UFormGroup>
      <UFormGroup label="Visibility" name="visibility">
        <URadio v-model="state.visibility" label="Private" value="private" help="You choose who can see and edit to this project" />
        <URadio v-model="state.visibility" label="Public" value="public" help="Anyone on the internet can see this project" />
      </UFormGroup>
      <div class="flex justify-end">
        <button class="btn btn-sm btn-neutral" type="submit" :loading="submitting">
          Submit
        </button>
      </div>
    </UForm>
  </div>
</template>
