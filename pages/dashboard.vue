<script setup lang="ts">
import type { Team } from '@prisma/client'

definePageMeta({
  layout: 'dashboard',
})

const toast = useToast()

const { $client } = useNuxtApp()

const menus = ref([
  { icon: 'mdi:view-dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'mdi:bookmark-box-multiple', label: 'Collection list', to: '/dashboard/collection' },
  { icon: 'mdi:clipboard-text-clock', label: 'Visted list', to: '/dashboard/visited' },
])

const loading = ref(false)

const teamList = ref<Team[]>([])

onMounted(() => {
  fetchTeamList()
})

const modalTeamCreate = ref(false)

function createTeam() {
  modalTeamCreate.value = true
}

function naviteToTeam(teamId: string) {
  fetchTeamList()
  navigateTo(`/dashboard/t/${teamId}`)
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

// async function onTeamDelete(id: string) {
//   try {
//     await $client.protected.teamDelete.mutate({ id })
//   }
//   catch (error) {
//     if (error instanceof Error) {
//       toast.add({ title: error.message, color: 'red' })
//       return
//     }
//     toast.add({ title: 'Unknown error', color: 'red' })
//   }
//   finally {
//     fetchTeamList()
//   }
// }
</script>

<template>
  <div>
    <UIModalTeamCreate v-model="modalTeamCreate" @success="naviteToTeam" />
    <div class="flex w-full h-[calc(100vh-64px)] overflow-hidden">
      <div class="relative menu h-full text-base-content">
        <ul class="menu bg-base w-56 rounded-box">
          <NuxtLink
            v-for="(menu, index) in menus" :key="index" v-slot="{ navigate }"
            :to="{ path: menu.to }"
            custom
          >
            <li @click="navigate">
              <a :href="menu.to">
                <Icon :icon="menu.icon" />
                <span>{{ menu.label }}</span>
              </a>
            </li>
          </NuxtLink>
        </ul>
        <div class="divider" />
        <ul class="menu bg-base w-56 rounded-box">
          <li>
            <h2 class="menu-title">
              <span>Your teams</span>
              <Icon icon="mdi:account-multiple-plus" class="ml-2 text-lg inline-block cursor-pointer hover:text-gray-900" @click="createTeam" />
            </h2>
            <ul>
              <NuxtLink
                v-for="team in teamList" :key="team.id" v-slot="{ navigate }"
                :to="{ path: `/dashboard/t/${team.id}` }"
                custom
              >
                <li @click="navigate">
                  <a>
                    <kbd class="kbd kbd-sm">{{ team.name?.[0] }}</kbd>
                    <span>{{ team.name }}</span>
                  </a>
                </li>
              </NuxtLink>
            </ul>
          </li>
        </ul>
        <div class="absolute p-2 pl-6 left-0 bottom-8 w-full h-[40px] flex items-center">
          <Icon icon="mdi:cog" />
          <span class="ml-2 font-bold">Settings</span>
        </div>
      </div>
      <div class="divider divider-horizontal" />
      <NuxtPage />
    </div>
  </div>
</template>
