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

const methodOptions = ref(ApiOptions)
</script>

<template>
  <div class="w-full flex gap-1">
    <select v-model="method" class="select select-sm select-bordered">
      <option v-for="option in methodOptions" :key="option">
        {{ option }}
      </option>
    </select>
    <input v-model="endpoint" class="input input-sm input-bordered w-full" placeholder="https://echo.hoppscotch.io">
    <button :loading="saving" class="btn btn-sm btn-neutral" @click="$emit('save')">
      Save
    </button>
    <button :loading="sending" class="btn btn-sm btn-neutral" @click="$emit('send')">
      Send
    </button>
  </div>
</template>
