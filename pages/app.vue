<script lang="ts" setup>
import type { ApiMethod } from '@prisma/client'

const { $client } = useNuxtApp()

const method = ref<ApiMethod>('GET')
const options = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH',
  'CUSTOM',
]
const url = ref('https://echo.hoppscotch.io')
const response = ref()

const sending = ref(false)
async function onSend() {
  sending.value = true
  try {
    const data = await $fetch('/proxy', {
      method: 'POST',
      body: JSON.stringify({
        method: method.value,
        url: url.value,
        params: {},
        headers: {},
        auth: {},
        body: {},
      }),
    })
    response.value = data
  }
  finally {
    sending.value = false
  }
}

const saving = ref(false)
async function onSave() {
  saving.value = true
  try {
    $client.protected.apiCreate.mutate({
      endpoint: url.value,
      method: method.value,
      params: {},
      body: {},
      headers: {},
      authorization: {},
      preRequestScript: '',
      postResponseScript: '',
      tags: [],
      versions: [],
      order: 1,
      // TODO:
      projectId: 'clnli74i20000vf2ny8o9r7sk',
    })
  }
  finally {
    saving.value = false
  }
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
        <UInput v-model="url" class="w-80" placeholder="https://echo.hoppscotch.io" />
        <UButton :loading="sending" @click="onSend">
          Send
        </UButton>
        <UButton :loading="saving" @click="onSave">
          Save
        </UButton>
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

          <pre>{{ response }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
