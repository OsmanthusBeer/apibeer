<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

definePageMeta({
  title: 'Home',
  requiredAuth: false,
})

const { $client } = useNuxtApp()
const { init } = useSessionUser()
const toast = useToast()

// redirect
const r = useRouteQuery<string>('r')

// Check if user is logged in
onMounted(() => {
  const { user } = useSessionUser()
  if (user.value)
    navigateTo(decodeURIComponent(r.value || '/dashboard'))
})

// Form
const state = ref({
  email: 'hi@apibeer.com',
  password: '123456',
})
const submitting = ref(false)
async function onSubmit() {
  const { email, password } = state.value
  submitting.value = true
  try {
    await $client.public.login.mutate({
      email,
      password,
    })
    await init({ force: true })
    navigateTo({ path: decodeURIComponent(r.value || '/dashboard') })
  }
  catch (error) {
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
  <div class="hero bg-base-200 lg:h-[calc(100vh-284px)]">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">
          Login now!
        </h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="onSubmit">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="state.email" type="email" placeholder="email" class="input input-bordered" required>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="state.password" type="password" placeholder="password" class="input input-bordered" required>
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">
              <span v-if="submitting" class="loading loading-spinner" />
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
