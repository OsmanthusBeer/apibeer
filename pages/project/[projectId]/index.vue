<script setup lang="ts">
import { noop } from '@vueuse/core'

// TODO: Wrap `splitpanes` component
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error TODO: `@types/splitpanes` dep vue2.7.x, but we use vue3
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import type { ApiMethod } from '~/types'

const { projectId } = useRoute().params as Record<string, string>
const { $client } = useNuxtApp()
const toast = useToast()

const apisRefresh = inject('apisRefresh', noop)

const method = ref<ApiMethod>('GET')
const endpoint = ref('https://echo.hoppscotch.io')
const response = ref()

const saving = ref(false)
async function onSave() {
  try {
    saving.value = true
    await $client.protected.apiCreate.mutate({
      endpoint: endpoint.value,
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

const sending = ref(false)
async function onSend() {
  try {
    sending.value = true
    const data = await $fetch('/proxy', {
      method: 'POST',
      body: JSON.stringify({
        method: method.value,
        url: endpoint.value,
        params: {},
        headers: {},
        auth: {},
        body: {},
      }),
    })
    response.value = data
  }
  catch (error) {
    console.error(error)
  }
  finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="h-full">
    <ApiInput
      v-model:method="method" v-model:endpoint="endpoint"
      v-model:saving="saving" v-model:sending="sending"
      @save="onSave" @send="onSend"
    />
    <Splitpanes class="w-full h-full flex gap-2" horizontal>
      <Pane>
        <ApiRequestTabs />
      </Pane>
      <Pane>
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
</template>
