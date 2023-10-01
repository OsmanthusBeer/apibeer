<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const { $client } = useNuxtApp()
const toast = useToast()

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

const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, description, visibility } = event.data
  submiting.value = true
  try {
    const project = await $client.protected.projectCreate.mutate({
      name,
      description,
      visibility: visibility.toUpperCase(),
    })
    navigateTo(`/p/${project.id}`)
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
    submiting.value = false
  }
}
</script>

<template>
  <h1>Project Create</h1>

  <UForm
    ref="form" class="mt-4 space-y-4"
    :state="state" :schema="schema"
    @submit="onSubmit"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="Name" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" placeholder="Description" />
    </UFormGroup>
    <UFormGroup label="Visibility" name="visibility">
      <URadio v-model="state.visibility" label="Private" value="private" help="You choose who can see and edit to this project" />
      <URadio v-model="state.visibility" label="Public" value="public" help="Anyone on the internet can see this project" />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton color="black" type="submit" :loading="submiting">
        Submit
      </UButton>
    </div>
  </UForm>
</template>
