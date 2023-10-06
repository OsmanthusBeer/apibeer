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

const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, description, visibility } = event.data
  submiting.value = true
  try {
    await $client.protected.projectUpdate.mutate({
      id,
      name,
      description,
      // TODO: type
      visibility: visibility.toUpperCase() as any,
    })
    toast.add({ title: 'Project updated', color: 'green' })
    navigateTo(`/p/${id}`)
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
        <UInput v-model="project.name" placeholder="Name" />
      </UFormGroup>
      <UFormGroup label="Description" name="description">
        <UTextarea v-model="project.description" placeholder="Description" />
      </UFormGroup>
      <UFormGroup label="Visibility" name="visibility">
        <URadio v-model="project.visibility" label="Private" value="private" help="You choose who can see and edit to this project" />
        <URadio v-model="project.visibility" label="Public" value="public" help="Anyone on the internet can see this project" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton color="black" type="submit" :loading="submiting">
          Submit
        </UButton>
      </div>
    </UForm>
  </template>
</template>
