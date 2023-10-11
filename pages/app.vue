<script lang="ts" setup>
import { ApiMethod } from '@prisma/client';

const method = ref<ApiMethod>('GET')
const options = Object.values(ApiMethod)
const url = ref('https://httpie.io/hello')

async function onSend() {
  const response = await $fetch('/proxy', {
    method: method.value as any,
    url: url.value,
  })
  console.log(response)
}
</script>

<template>
  <div class="w-screen h-screen flex gap-2">
    <div class="w-1/4 border">
      Left
    </div>

    <div class="w-3/4 p-1 border flex flex-col gap-2">
      <div class="w-full flex gap-1">
        <USelectMenu v-model="method" :options="options" />
        <UInput v-model="url" class="w-80" placeholder="https://httpie.io/hello" />
        <UButton @click="onSend">
          Send
        </UButton>
        <UButton>Save</UButton>
      </div>
      <div class="w-full h-full flex gap-2">
        <div class="flex-1 border">
          <div class="flex p-1">
            <div class="w-32">
              Params
            </div>
            <div class="w-32">
              Headers
            </div>
            <div class="w-32">
              Auth
            </div>
            <div class="w-32">
              Body
            </div>
          </div>
        </div>
        <div class="flex-1 border">
          <div class="flex p-1">
            <div class="w-32">
              Request
            </div>
            <div class="w-32">
              Response
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
