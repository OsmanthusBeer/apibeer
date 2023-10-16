<script setup lang="ts">
interface ProjectListProp {
  teamId: string
}
const props = withDefaults(defineProps<ProjectListProp>(), {
  teamId: '',
})
const { $client } = useNuxtApp()
// fetch team members
const { pending, error, data: members } = $client.protected.teamMembers.useQuery({
  teamId: props.teamId,
})
</script>

<template>
  <div class="flex items-center my-8">
    <UInput class="w-44 mr-4" icon="i-heroicons-magnifying-glass-20-solid" size="sm" color="white" :trailing="false" />
    <UButton @click="() => {}">
      Invite Members
    </UButton>
  </div>
  <div v-if="pending" class="grid grid-cols-4 gap-4">
    <UCard v-for="n in 4" :key="n">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="mt-2 space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[100px]" />
      </div>
    </UCard>
  </div>
  <UAlert
    v-else-if="error"
    title="Fetch project list error" icon="i-heroicons-x-circle-solid"
    color="red" variant="outline"
  >
    <template #description>
      {{ JSON.stringify(error) }}
    </template>
  </UAlert>
  <ul v-else role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-y-16 xl:col-span-2">
    <li v-for="user in members" :key="user.id">
      <div class="flex items-center gap-x-6">
        <img class="h-16 w-16 rounded-full" :src="user.avatar" alt="">
        <div>
          <h3 class="text-base font-semibold leading-7 tracking-tight">
            {{ user.username }} ({{ user.role }})
          </h3>
          <p class="text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400">
            {{ user.email }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
