<script lang="ts" setup>
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { ApiParams } from '~/types'

const params = defineModel<ApiParams[]>('params', { default: [] })

const queryParams = computed(() => {
  return params.value.filter(param => param.scope === 'query')
})
const pathParams = computed(() => {
  return params.value.filter(param => param.scope === 'path')
})

const tabItems: TabItem[] = [
  { label: 'Params', slot: 'params' },
  { label: 'Body', slot: 'body' },
  { label: 'Headers', slot: 'headers' },
  { label: 'Auth', slot: 'auth' },
  { label: 'Pre Request Script', slot: 'preRequestScript' },
  { label: 'Post Response Script', slot: 'postResponseScript' },
]
</script>

<template>
  <UTabs :items="tabItems" class="w-full">
    <template #params>
      <template v-if="queryParams.length">
        <p>Query Parameters</p>
        <UTable :rows="queryParams" :ui="{ td: { padding: 'px-1' } }">
          <template #key-data="{ row }">
            <UInput v-model="row.key" placeholder="Key" />
          </template>
          <template #value-data="{ row }">
            <UInput v-model="row.value" placeholder="Value" />
          </template>
          <template #type-data="{ row }">
            <UInput v-model="row.type" placeholder="Type" />
          </template>
          <template #example-data="{ row }">
            <UInput v-model="row.example" placeholder="Example" />
          </template>
          <template #description-data="{ row }">
            <UInput v-model="row.description" placeholder="Description" />
          </template>
        </UTable>
      </template>
      <template v-if="pathParams.length">
        <p>Path Parameters</p>
        <UTable :rows="pathParams" :ui="{ td: { padding: 'px-1' } }">
          <template #key-data="{ row }">
            <UInput v-model="row.key" placeholder="Key" />
          </template>
          <template #value-data="{ row }">
            <UInput v-model="row.value" placeholder="Value" />
          </template>
          <template #type-data="{ row }">
            <UInput v-model="row.type" placeholder="Type" />
          </template>
          <template #example-data="{ row }">
            <UInput v-model="row.example" placeholder="Example" />
          </template>
          <template #description-data="{ row }">
            <UInput v-model="row.description" placeholder="Description" />
          </template>
        </UTable>
      </template>
    </template>
  </UTabs>
</template>
