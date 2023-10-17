<script lang="ts" setup>
import type { TabItem } from '@nuxt/ui/dist/runtime/types';

const tabItems: TabItem[] = [
  { label: 'Params', slot: 'params', title: 'Query Parameters' },
  { label: 'Body', slot: 'body', title: 'Body' },
  { label: 'Headers', slot: 'headers', title: 'Headers' },
  { label: 'Auth', slot: 'auth', title: 'Authorization' },
]

const paramsRows = [
  { key: '', value: '', type: '', example: '', description: '' },
]
</script>

<template>
  <UTabs :items="tabItems" class="w-full">
    <template #params="{ item }">
      <p>{{ item.title }}</p>
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
