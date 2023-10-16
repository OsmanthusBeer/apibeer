<script setup lang="ts">
import type { Team } from '@prisma/client'

const toast = useToast()

const { $client } = useNuxtApp()

const createTeamModalRef = ref()
const menus = ref([
  { icon: 'i-heroicons-home', label: 'Dashboard', to: '/dashboard' },
  { icon: 'i-heroicons-star', label: 'Collection list', to: '/collection' },
  { icon: 'i-heroicons-clock', label: 'Visted list', to: '/visited' },
])

const loading = ref(false)

const teamList = ref<Team[]>([])

onMounted(() => {
  fetchTeamList()
})

function createTeam() {
  createTeamModalRef.value.show()
}

async function fetchTeamList() {
  try {
    loading.value = true
    const data = await $client.protected.teamList.query()
    teamList.value = data
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({ title: error.message, color: 'red' })
      return
    }
    console.error(error)
    toast.add({ title: 'Unknown error', color: 'red' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <create-team-modal ref="createTeamModalRef" @submit="fetchTeamList" />
  <div class="flex w-screen h-screen overflow-hidden">
    <div class="relative w-[280px] h-screen px-4 py-8 border-r border-gray-200 dark:border-gray-800">
      <!-- logo -->
      <div class="flex items-center">
        <img class="w-[42px] mr-2" src="/logo_148x148.png" alt="">
        <span class="text-2xl font-extrabold">API Beer</span>
      </div>
      <!-- menu list -->
      <ul class="mt-8">
        <NuxtLink
          v-for="(menu, index) in menus" :key="index" v-slot="{ navigate }"
          :to="{ path: menu.to }"
          custom
        >
          <li class="py-2 my-2 rounded cursor-pointer text-gray-700  hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" @click="navigate">
            <UIcon :name="menu.icon" />
            <span class="ml-2 font-semibold">{{ menu.label }}</span>
          </li>
        </NuxtLink>
      </ul>
      <!-- team list -->
      <div class="mt-4">
        <div class="flex items-center text-xs font-semibold">
          <span class="mr-2">Your teams</span>
          <UButton icon="i-heroicons-folder-plus" size="sm" variant="ghost" @click="createTeam" />
        </div>
        <ul v-if="loading" class="h-3/5 overflow-auto mt-2">
          <li v-for="(team, index) in 4" :key="index" class="group p-2 my-2 flex items-center rounded cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" @click="navigate">
            <USkeleton class="h-[20px] w-[20px]" />
            <USkeleton class="ml-4 h-4 w-[120px]" />
          </li>
        </ul>
        <ul v-else-if="teamList?.length" class="h-3/5 overflow-auto mt-2">
          <NuxtLink
            v-for="team in teamList" :key="team.id" v-slot="{ navigate }"
            :to="{ path: `/t/${team.id}` }"
            custom
          >
            <li class="group p-2 my-2 flex items-center rounded cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" @click="navigate">
              <UKbd>{{ team.name?.[0] }}</UKbd>
              <span class="ml-4 font-semibold">{{ team.name }}</span>
              <UButton class="hidden ml-auto group-hover:flex" icon="i-heroicons-x-circle" size="2xs" variant="ghost" @click.stop="deleteTeam(team)" />
            </li>
          </NuxtLink>
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
