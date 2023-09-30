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
  </div>
</template>
