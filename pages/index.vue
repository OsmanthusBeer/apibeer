<script setup lang="ts">
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="hero min-h-screen" style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
      <div class="hero-overlay bg-opacity-60" />
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">
            Design and Document APIs with API Beer.
          </h1>
          <p class="mb-5">
            Create, manage APIs effortlessly using API Beer.
          </p>
          <button class="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" class="max-w-sm rounded-lg shadow-2xl">
        <div>
          <h1 class="text-5xl font-bold">
            Feature1
          </h1>
          <p class="py-6">
            Feature1 xxxxxxxxxx.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
