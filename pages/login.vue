<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

const { $client } = useNuxtApp()
const toast = useToast()
const router = useRouter()

const schema = z.object({
  email: z.string(),
  password: z.string(),
})
type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined,
})

const form = ref<Form<Schema>>()
const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password } = event.data
  submiting.value = true
  try {
    // TODO: Use `cookie` auth strategy
    const _user = await $client.auth.login.mutate({
      email,
      password,
    })
    router.replace({ path: '/dashboard' })
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
  }
  finally {
    submiting.value = false
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <p>Login</p>
    <div class="mt-8 w-96 px-8 py-4 border rounded">
      <UForm
        ref="form" class="space-y-4"
        :schema="schema" :state="state"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" placeholder="123456" icon="i-heroicons-lock-closed" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton type="submit" :loading="submiting">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
