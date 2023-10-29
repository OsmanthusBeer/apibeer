<script lang="ts" setup>
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})

const { $client } = useNuxtApp()
const { init } = useSessionUser()
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
const state = ref({
  email: 'hi@apibeer.com',
  password: '123456',
})
const submiting = ref(false)
async function onSubmit() {
  const { email, password } = state.value
  submiting.value = true
  try {
    await $client.public.login.mutate({
      email,
      password,
    })
    const r = route.query.r as string
    await init({ force: true })
    navigateTo({ path: decodeURIComponent(r || '/dashboard') })
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
    submiting.value = false
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
        <form class="card-body">
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
            <button class="btn btn-primary" @click="onSubmit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- <div class="h-screen flex flex-col items-center justify-center">
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
          <UInput v-model="state.password" type="password" placeholder="Your Password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton type="submit" :loading="submiting">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div> -->
</template>
