<script lang="ts" setup>
import type { Form, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { z } from 'zod'

definePageMeta({
  title: 'Home',
  requiredAuth: false,
})

const { $client } = useNuxtApp()
const route = useRoute()
const toast = useToast()

// Check if user is logged in
onMounted(() => {
  const { user } = useSessionUser()
  if (user.value) {
    // TODO: Wrap a utils function
    const r = route.query.r as string
    navigateTo(decodeURIComponent(r || '/dashboard'))
  }
})

// Form
const schema = z.object({
  email: z.string(),
  password: z.string(),
})
type Schema = z.output<typeof schema>
const state = ref({
  email: 'hi@apibeer.com',
  password: 'apibeer',
})
const form = ref<Form<Schema>>()
const submiting = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password } = event.data
  submiting.value = true
  try {
    await $client.public.login.mutate({
      email,
      password,
    })
    const r = route.query.r as string
    navigateTo({ path: decodeURIComponent(r || '/dashboard') })
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
          <UInput v-model="state.password" placeholder="Your Password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton color="black" type="submit" :loading="submiting">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
