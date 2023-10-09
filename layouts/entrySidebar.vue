<script setup lang="ts">
</script>

<template>
  <div class="flex">
    <div class="relative w-[280px] h-screen px-4 py-8 border-r border-gray-200 dark:border-gray-800">
      <!-- logo -->
      <div class="flex items-center">
        <img class="w-[42px] mr-2" src="/logo_148x148.png" alt="">
        <span class="text-2xl font-extrabold">API Beer</span>
      </div>
      <!-- team list -->
      <div class="mt-10">
        <div class="text-xs font-semibold">
          Your teams
        </div>
        <ul class="h-3/5 overflow-auto mt-2">
          <li class="p-2 my-2 rounded text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white">
            <UKbd>A</UKbd>
            <span class="ml-4 font-semibold align-middle">Team A</span>
          </li>
          <li class="p-2 my-2 rounded text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white">
            <UKbd>B</UKbd>
            <span class="ml-4 font-semibold text-gray-300 align-middle">Team B</span>
          </li>
          <li class="p-2 my-2 rounded text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white">
            <UKbd>C</UKbd>
            <span class="ml-4 font-semibold align-middle">Team C</span>
          </li>
        </ul>
      </div>
      <!-- bottom menu -->
      <div class="absolute p-2 pl-6 left-0 bottom-8 w-full h-[40px] flex items-center">
        <UIcon name="i-mdi-cog" />
        <span class="ml-4 font-bold">Settings</span>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
