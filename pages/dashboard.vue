<script setup>
const { user, logout } = useSessionUser()
</script>

<template>
  <p>{{ user }}</p>

  <div class="mt-8 w-full flex gap-2">
    <NuxtLink v-for="n in 10" :key="n" :to="{ path: `/p/${n}` }">
      {{ n }}
    </NuxtLink>
  </div>

  <NuxtLink to="p/create">
    <UButton color="black">
      Create
    </UButton>
  </NuxtLink>

  <br><br><br>

  <UButton color="red" @click="logout()">
    退出
  </UButton>
</template>
