<script setup>
definePageMeta({
  layout: 'entry-sidebar',
})

const route = useRoute()
const id = ref(route.params.id)

// Fetch team
const { $client } = useNuxtApp()
const { pending: teamPending, error: teamError, data: team } = await $client.protected.teamShow.useQuery({
  id: id.value,
})

// team tabs
const teamTabs = [{
  label: 'Projects',
  icon: 'i-heroicons-computer-desktop',
  key: resolveComponent('ProjectList'),
}, {
  label: 'Members',
  icon: 'i-heroicons-user',
  key: resolveComponent('TeamMembers'),
}]

const selectedTabIndex = ref(0)
const renderComponent = computed(() => {
  return teamTabs[selectedTabIndex.value].key
})
</script>

<template>
  <div class="p-8">
    <h1 v-if="teamPending" class="text-2xl pb-4 font-semibold border-b border-gray-200 dark:border-gray-800">
      <USkeleton class="h-[48px]" />
    </h1>
    <UAlert
      v-else-if="teamError"
      title="Fetch team info error" icon="i-heroicons-x-circle-solid"
      color="red" variant="outline"
    >
      <template #description>
        {{ JSON.stringify(teamError) }}
      </template>
    </UAlert>
    <h1 v-else class="text-2xl pb-4 font-semibold border-b border-gray-200 dark:border-gray-800">
      {{ team?.name }}
    </h1>

    <UTabs v-model="selectedTabIndex" :items="teamTabs" class="w-80 mt-4">
      <template #default="{ item }">
        <div class="flex items-center relative truncate">
          <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
          <span class="ml-2 truncate">{{ item.label }}</span>
          <span v-if="selectedTabIndex" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
        </div>
      </template>
    </UTabs>
    <component :is="renderComponent" :team-id="id" />
  </div>
</template>
