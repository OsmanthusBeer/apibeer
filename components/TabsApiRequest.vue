<script lang="ts" setup>
import type { TabItem } from '@nuxt/ui/dist/runtime/types'

const tabItems: TabItem[] = [
  { label: 'Params', slot: 'params' },
  { label: 'Body', slot: 'body' },
  { label: 'Headers', slot: 'headers' },
  { label: 'Auth', slot: 'auth' },
  { label: 'Pre Request Script', slot: 'preRequestScript' },
  { label: 'Post Response Script', slot: 'postResponseScript' },
]

const paramsRows = [
  { key: '', value: '', type: '', example: '', description: '' },
]
</script>

<template>
  <UTabs :items="tabItems" class="w-full">
    <template #params>
      <p>Query Parameters</p>
      <UTable :rows="paramsRows" :ui="{ td: { padding: 'px-1' } }">
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
      <p>Path Parameters</p>
      <UTable :rows="paramsRows" :ui="{ td: { padding: 'px-1' } }">
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
  </UTabs>
</template>
