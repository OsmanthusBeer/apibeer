<script lang="ts" setup>
import type { ApiMethod } from '~/types'
import { ApiOptions } from '~/constants'

defineEmits<{
  (event: 'send'): Promise<void>
  (event: 'save'): Promise<void>
}>()
const method = defineModel<ApiMethod>('method', { default: 'GET' })
const endpoint = defineModel<string>('endpoint', { default: '' })
const saving = defineModel<boolean>('saving', { default: false })
const sending = defineModel<boolean>('sending', { default: false })

const options = ref(ApiOptions)
</script>

<template>
  <div class="w-full flex gap-1">
    <USelectMenu v-model="method" :options="options" />
    <UInput v-model="endpoint" class="w-full" placeholder="https://echo.hoppscotch.io" />
    <UButton :loading="saving" @click="$emit('save')">
      Save
    </UButton>
    <UButton :loading="sending" @click="$emit('send')">
      Send
    </UButton>
  </div>
</template>
