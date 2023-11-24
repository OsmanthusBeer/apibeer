<script lang="ts" setup>
type ToastType = 'info' | 'success' | 'error'
const props = withDefaults(defineProps<{
  message?: string
  type?: ToastType
}>(), {
  message: '',
  type: 'info',
})
</script>

<template>
  <div class="toast toast-end">
    <div class="alert alert-success" :class="[`alert-${props.type}`]">
      <span>{{ props.message }}</span>
    </div>
  </div>
</template>
