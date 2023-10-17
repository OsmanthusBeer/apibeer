<script lang="ts" setup>
import type { Form, FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const emit = defineEmits(['success'])
const { $client } = useNuxtApp()
const toast = useToast()

const modelValue = defineModel<boolean>({ default: false })

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
})
type Schema = z.output<typeof schema>
const form = ref<Form<Schema>>()
const state = ref({
  name: '',
  description: '',
})

function validate(state: Schema): FormError[] {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: 'Required' })
  return errors
}

const submiting = ref(false)
async function submit(event: FormSubmitEvent<any>) {
  const { name, description } = event.data
  submiting.value = true
  try {
    const { id } = await $client.protected.teamCreate.mutate({
      name,
      description,
    })
    toast.add({ title: 'create team success.', color: 'green' })
    emit('success', id)
    form.value?.clear()
    modelValue.value = false
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
  <div class="w-28">
    <UModal v-model="modelValue" class="text-red" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create Team
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modelValue = false" />
          </div>
        </template>
        <UForm
          ref="form"
          :validate="validate"
          :state="state"
          @submit="submit"
        >
          <UFormGroup label="Team name" name="name">
            <UInput v-model="state.name" class="mt-4" />
          </UFormGroup>

          <UFormGroup class="mt-4" label="Team description" name="description">
            <UInput v-model="state.description" class="mt-4" />
          </UFormGroup>

          <div class="mt-4 text-right">
            <UButton type="submit" class="">
              Submit
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
