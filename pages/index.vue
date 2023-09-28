<script setup lang="ts">
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <h2>Hi</h2>
    <select v-model="$colorMode.preference">
      <option value="system">
        System
      </option>
      <option value="light">
        Light
      </option>
      <option value="dark">
        Dark
      </option>
      <option value="sepia">
        Sepia
      </option>
    </select>

    <div class="mt-8">
      <NuxtLink to="/login">
        <UButton>Login</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
