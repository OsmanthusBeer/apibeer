<script setup lang="ts">
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="text-gray-800 dark:text-white mt-6 py-6">
      <div class="container mx-auto text-center">
        <h1 class="text-5xl font-semibold mb-4">
          Design and Document APIs
        </h1>
        <h1 class="text-5xl font-semibold mb-4">
          <span>with</span> <span class="text-primary">API Beer</span>
        </h1>
        <p class="text-xl mb-12">
          Create, manage APIs effortlessly using API Beer.
        </p>
        <a href="#" class="bg-white border border-primary dark:border-none text-primary-400 rounded-full py-2 px-8 text-lg hover:bg-primary-100 hover:text-primary-800 transition duration-300">Get Started</a>
      </div>
    </section>

    <!-- Main image -->
    <section class="py-6">
      <img class="overflow-hidden rounded-lg w-9/12 mx-auto" src="https://api.cyrilstudio.top/bing/image.php" alt="" srcset="">
    </section>

    <!-- Features Section -->
    <section class="py-6">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-semibold mb-8">
          Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="(feature, index) in 3" :key="index" class="bg-white shadow-md p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              feature
            </h3>
            <p class="text-gray-600">
              feature
            </p>
          </div>
        </div>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="(feature, index) in 3" :key="index" class="bg-white shadow-md p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              feature
            </h3>
            <p class="text-gray-600">
              feature
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
