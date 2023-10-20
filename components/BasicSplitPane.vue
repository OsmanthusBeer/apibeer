<script lang="ts" setup>
withDefaults(defineProps<{
  dir?: 'vertical' | 'horizontal'
}>(), {
  dir: 'horizontal',
})

const slots = defineSlots<{
  default(): []
}>()

slots.default()
</script>

<template>
  <div class="w-full flex" :class="{ 'flex-col': dir === 'vertical' }">
    <div>
      <slot />
    </div>
    <div class="divide-gray-200 hover:divide-gray-200" />
    <div>
      <slot />
    </div>
  </div>
</template>
