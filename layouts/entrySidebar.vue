<script setup lang="ts">
const createTeamModalRef = ref()

const menus = ref([
  { icon: 'i-heroicons-star', label: 'Favorites list' },
  { icon: 'i-heroicons-clock', label: 'Recent visits' },
])

const teams = ref([{
  name: 'Team A',
}, {
  name: 'Team B',
}, {
  name: 'Team C',
}])

function createTeam() {
  createTeamModalRef.value.show()
}

function submitCreateTeam(team: { name: string }) {
  teams.value.push(team)
}
</script>

<template>
  <create-team-modal ref="createTeamModalRef" @submit="submitCreateTeam" />
  <div class="flex w-screen h-screen overflow-hidden">
    <div class="relative w-[280px] h-screen px-4 py-8 border-r border-gray-200 dark:border-gray-800">
      <!-- logo -->
      <div class="flex items-center">
        <img class="w-[42px] mr-2" src="/logo_148x148.png" alt="">
        <span class="text-2xl font-extrabold">API Beer</span>
      </div>
      <!-- menu list -->
      <ul class="mt-8">
        <li v-for="(menu, index) in menus" :key="`menu__${index}`" class="py-2 my-2 rounded cursor-pointer text-gray-700  hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
          <UIcon :name="menu.icon" />
          <span class="ml-2 font-semibold">{{ menu.label }}</span>
        </li>
      </ul>
      <!-- team list -->
      <div class="mt-4">
        <div class="flex items-center text-xs font-semibold">
          <span class="mr-2">Your teams</span>
          <UButton icon="i-heroicons-folder-plus" size="2xs" variant="ghost" @click="createTeam" />
        </div>
        <ul class="h-3/5 overflow-auto mt-2">
          <li v-for="(team, index) in teams" :key="`team__${index}`" class="p-2 my-2 rounded cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
            <UKbd>{{ team.name?.[0] }}</UKbd>
            <span class="ml-4 font-semibold align-middle">{{ team.name }}</span>
          </li>
        </ul>
      </div>
      <!-- bottom menu -->
      <div class="absolute p-2 pl-6 left-0 bottom-8 w-full h-[40px] flex items-center">
        <UIcon name="i-mdi-cog" />
        <span class="ml-4 font-bold">Settings</span>
      </div>
    </div>
    <div class="overflow-auto w-full h-full">
      <slot />
    </div>
  </div>
</template>
