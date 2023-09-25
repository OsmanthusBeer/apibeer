<script lang="ts" setup>
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

    <h2>NuxtUI</h2>
    <UButton>Button</UButton>

    <h2>Unocss</h2>
    <div>
      <h3>## Icons</h3>
      <p>
        <i class="font-size-20px inline-block i-tabler-icons-ball-bowling mr-2" />
        <i class="font-size-20px inline-block i-tabler-icons-alarm mr-2" />
        <i class="font-size-20px inline-block i-tabler-icons-coin-bitcoin" />
      </p>
      <h3>## Button</h3>
      <p>
        <button class="btn mr-2">button</button>
        <button class="btn-red mr-2">button</button>
        <button class="btn-green">button</button>
      </p>
    </div>
  </div>
</template>
