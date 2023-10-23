<script lang="ts" setup>
import { ApiMethod } from '~/types'

const props = defineProps<{
  projectId: string
  id: string
  method: ApiMethod
  endpoint: string
}>()

const emit = defineEmits<{
  (event: 'deleted'): void
}>()

const toast = useToast()

const { $client } = useNuxtApp()
async function onDeleteApi() {
  try {
    await $client.protected.apiDelete.mutate({ id: props.id })
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    emit('deleted')
  }
}
</script>

<template>
  <NuxtLink
    class="px-4 py-2 flex items-center justify-between border cursor-pointer"
    :to="`/project/${projectId}/api/${props.id}`"
  >
    <div class="flex gap-2">
      <ApiMethod :method="method" />
      <p>{{ endpoint }}</p>
    </div>
    <UIcon name="i-heroicons-trash" class="cursor-pointer" @click.stop="onDeleteApi" />
  </NuxtLink>
</template>
