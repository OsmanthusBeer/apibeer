<script lang="ts" setup>
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})
</script>

<template>
  <div class="container mx-auto">
    <h1>pages/index.vue</h1>

    <h2>Envs</h2>
    <div>
      <h3>## Server</h3>
      <p>DATABASE_URL: {{ $config.databaseUrl }} <span>(Note: Will be empty)</span></p>
      <h3>## Client</h3>
      <p>NUXT_PUBLIC_GREETING: {{ $config.public.greeting }}</p>
    </div>
  </div>
</template>
