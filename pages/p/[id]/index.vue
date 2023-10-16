<script lang="ts" setup>
import type { ApiMethod } from '@prisma/client'

// TODO: Wrap `splitpanes` component
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error TODO: `@types/splitpanes` dep vue2.7.x, but we use vue3
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const route = useRoute()
const projectId = route.params.id as string

const { $client } = useNuxtApp()
const toast = useToast()

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

const { error: apisError, pending: apisPending, data: apis, refresh: apisRefresh } = $client.protected.apiList.useQuery({ projectId })

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
    await $client.protected.apiCreate.mutate({
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
      projectId,
    })
    apisRefresh()
    toast.add({ title: 'Saved', color: 'green' })
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="w-screen h-screen flex gap-2">
    <div class="w-1/4 border flex gap-2">
      <div v-if="apisError">
        {{ apisError }}
      </div>
      <div v-else-if="apisPending">
        Loading...
      </div>
      <div v-else class="px-4 py-2">
        <UCard v-for="api in apis" :key="api.id" class="w-full text-xs">
          <p>Id: {{ api.id }}</p>
          <p>Endpoint: {{ api.endpoint }}</p>
          <p>Name: {{ api.name }}</p>
        </UCard>
      </div>
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
      <Splitpanes class="default-theme w-full h-full flex gap-2">
        <Pane min-size="25">
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
        </Pane>
        <Pane min-size="25">
          <div class="flex p-1">
            <div class="w-32">
              Request
            </div>
            <div class="w-32">
              Response
            </div>
          </div>
          <pre>{{ response }}</pre>
        </Pane>
      </Splitpanes>
    </div>
  </div>
</template>
