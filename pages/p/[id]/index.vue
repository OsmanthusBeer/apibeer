<script lang="ts" setup>
import type { ApiMethod } from '@prisma/client'

// TODO: Wrap `splitpanes` component
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error TODO: `@types/splitpanes` dep vue2.7.x, but we use vue3
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

definePageMeta({
  layout: 'project',
})

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
const { error: collectioinsError, pending: collectionsPending, data: collections, refresh: collectionsRefresh } = $client.protected.collectionList.useQuery({ projectId })

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

const modalCollectioinCreate = ref(false)
function openModalCollectionCreate() {
  modalCollectioinCreate.value = true
}
async function onCollectionDelete(id: string) {
  try {
    await $client.protected.cololectionDelete.mutate({ id })
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    collectionsRefresh()
  }
}

async function onDeleteApi(id: string) {
  try {
    await $client.protected.apiDelete.mutate({ id })
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    apisRefresh()
  }
}
</script>

<template>
  <Splitpanes class="w-screen h-screen flex gap-2">
    <Pane class="px-4 py-2 space-y-2 border">
      <UButton @click="openModalCollectionCreate">
        Create Collection
      </UButton>
      <ModalCollectioinCreate v-model="modalCollectioinCreate" :project-id="projectId" @success="collectionsRefresh" />

      <div v-if="collectioinsError">
        {{ collectioinsError }}
      </div>
      <div v-else-if="collectionsPending">
        Loading..
      </div>
      <div v-else class="space-y-2">
        <UCard v-for="collection in collections" :key="collection.id" class="relative">
          <p>{{ collection.name }}</p>
          <UIcon
            name="i-heroicons-trash" class="w-4 h-4 absolute top-4 right-4 cursor-pointer"
            @click="onCollectionDelete(collection.id)"
          />
        </UCard>
      </div>

      <div v-if="apisError">
        {{ apisError }}
      </div>
      <div v-else-if="apisPending">
        Loading...
      </div>
      <div v-else class="space-y-2">
        <UCard v-for="api in apis" :key="api.id" class="w-full">
          <div class="flex justify-between">
            <div class="flex gap-2">
              <LabelApiMethod class="w-16" :method="api.method" />
              <span>{{ api.name || api.endpoint }}</span>
            </div>
            <UIcon name="i-heroicons-trash" class="cursor-pointer" @click="onDeleteApi(api.id)" />
          </div>
        </UCard>
      </div>
    </Pane>

    <Pane class="w-3/4 p-1 border flex flex-col gap-2">
      <div class="w-full flex gap-1">
        <USelectMenu v-model="method" :options="options" />
        <UInput v-model="url" class="w-full" placeholder="https://echo.hoppscotch.io" />
        <UButton :loading="sending" @click="onSend">
          Send
        </UButton>
        <UButton :loading="saving" @click="onSave">
          Save
        </UButton>
      </div>
      <Splitpanes class="w-full h-full flex gap-2" horizontal>
        <Pane>
          <TabsApiRequest />
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
    </Pane>
  </Splitpanes>
</template>
