<script setup>
const { user } = useSessionUser()
</script>

<template>
  <p>{{ user }}</p>

  <div class="mt-8 w-full flex gap-2">
    <NuxtLink v-for="n in 10" :key="n" :to="{ path: `/p/${n}` }">
      {{ n }}
    </NuxtLink>
  </div>
</template>
