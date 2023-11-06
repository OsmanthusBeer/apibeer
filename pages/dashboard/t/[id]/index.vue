<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
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
  key: resolveComponent('UIProjectList'),
}, {
  label: 'Members',
  icon: 'i-heroicons-user',
  key: resolveComponent('UITeamMembers'),
}]

const selectedTabIndex = ref(0)
const renderComponent = computed(() => {
  return teamTabs[selectedTabIndex.value].key
})

function selectTab(index: number) {
  selectedTabIndex.value = index
}
</script>

<template>
  <div class="p-8">
    <h1 v-if="teamPending" class="text-2xl pb-4 font-semibold border-b border-gray-200 dark:border-gray-800">
      <USkeleton class="h-[48px]" />
    </h1>
    <div v-else-if="teamError" class="alert alert-error">
      <span>{{ JSON.stringify(teamError) }}</span>
    </div>
    <h1 v-else class="text-2xl pb-4 font-semibold border-b border-gray-200 dark:border-gray-800">
      {{ team?.name }}
    </h1>

    <div class="tabs mt-10">
      <a v-for="(tab, index) in teamTabs" :key="index" class="tab tab-lifted" :class="[selectedTabIndex === index ? 'tab-active' : '']" @click="selectTab(index)">
        <span>{{ tab.label }}</span>
      </a>
    </div>

    <component :is="renderComponent" :team-id="id" />
  </div>
</template>
