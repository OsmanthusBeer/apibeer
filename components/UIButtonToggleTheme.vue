<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <button class="btn btn-ghost">
      <Icon
        :icon="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'"
        class="cursor-pointer"
        @click="isDark = !isDark"
      />
    </button>
  </ClientOnly>
</template>
