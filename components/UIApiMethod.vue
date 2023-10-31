<script setup lang="ts">
import type { ApiMethod } from '~/types'

defineProps<{
  method: ApiMethod
}>()
</script>

<template>
  <div>
    <span :class="`api-text__${method}`" class="font-bold">{{ method }}</span>
  </div>
</template>

<style scoped>
.api-text__GET {
  @apply text-green-500;
}
.api-text__PUT {
  @apply text-orange-500;
}
.api-text__DELETE {
  @apply text-red-500;
}
.api-text__POST {
  @apply text-blue-500;
}
.api-text__HEAD {
  @apply text-purple-500;
}
.api-text__CONNECT {
  @apply text-pink-500;
}
.api-text__OPTIONS {
  @apply text-yellow-500;
}
.api-text__TRACE {
  @apply text-indigo-500;
}
.api-text__PATCH {
  @apply text-teal-500;
}
.api-text__CUSTOM {
  @apply text-gray-500;
}
</style>
