<script lang="ts" setup>
// TODO: Wrap `splitpanes` component
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error TODO: `@types/splitpanes` dep vue2.7.x, but we use vue3
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

definePageMeta({
  layout: 'project',
})

const route = useRoute()
const { projectId } = route.params as Record<string, string>

const { $client } = useNuxtApp()
const toast = useToast()

const { error: apisError, pending: apisPending, data: apis, refresh: apisRefresh } = $client.protected.apiList.useQuery({ projectId })
const { error: collectionsError, pending: collectionsPending, data: collections, refresh: collectionsRefresh } = $client.protected.collectionList.useQuery({ projectId })

provide('apisRefresh', apisRefresh)

const modalCollectionCreate = ref(false)
function openModalCollectionCreate() {
  modalCollectionCreate.value = true
}
async function onCollectionDelete(id: string) {
  try {
    await $client.protected.collectionDelete.mutate({ id })
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
</script>

<template>
  <Splitpanes class="w-full h-full flex gap-2">
    <Pane class="px-4 py-2 space-y-2 border" size="30">
      <button class="btn btn-neutral" @click="openModalCollectionCreate">
        Create Collection
      </button>
      <UIModalCollectionCreate v-model="modalCollectionCreate" :project-id="projectId" @success="collectionsRefresh" />

      <div v-if="collectionsError">
        {{ collectionsError }}
      </div>
      <div v-else-if="collectionsPending">
        Loading..
      </div>
      <div v-else class="space-y-2">
        <div v-for="collection in collections" :key="collection.id" class="card card-bordered px-8 py-4 relative">
          <p>{{ collection.name }}</p>
          <Icon
            name="heroicons:trash" class="w-4 h-4 absolute top-4 right-4 cursor-pointer"
            @click="onCollectionDelete(collection.id)"
          />
        </div>
      </div>

      <div v-if="apisError">
        {{ apisError }}
      </div>
      <div v-else-if="apisPending">
        Loading...
      </div>
      <div v-else class="space-y-2">
        <UICardApi
          v-for="api in apis"
          :id="api.id" :key="api.id" class="w-full"
          :project-id="projectId" :method="api.method" :endpoint="api.endpoint"
          @deleted="apisRefresh"
        />
      </div>
    </Pane>
    <Pane class="p-1 border flex flex-col gap-2" size="70">
      <NuxtPage />
    </Pane>
  </Splitpanes>
</template>
