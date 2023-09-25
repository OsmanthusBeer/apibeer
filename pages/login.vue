<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { z } from 'zod';

const { $client } = useNuxtApp()

const schema = z.object({
  email: z.string(),
  password: z.string(),
})
type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const data = await $client.login.mutate(event.data)
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <p>Login</p>
    <div class="mt-8 w-96 px-8 py-4 border rounded">
      <UForm
        class="space-y-4"
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
          <UButton type="submit">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
