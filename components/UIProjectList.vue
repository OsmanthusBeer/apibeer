<script setup lang="ts">
import type { Project } from '@prisma/client'

interface ProjectListProp {
  teamId: string
}
interface ProjectItem extends Project {
  isFavorite: boolean
}
const props = withDefaults(defineProps<ProjectListProp>(), {
  teamId: '',
})
const { $client, $toast } = useNuxtApp()
// fetch project list
// const { pending, error, data: projects } = $client.protected.projectList.useQuery({
//   teamId: props.teamId,
// })
const pending = ref(false)
const fetchError = ref<any>(null)
const projects = ref<ProjectItem[]>([])
async function fetchProjects() {
  try {
    pending.value = true
    const list = await $client.protected.projectList.query({
      teamId: props.teamId,
    })
    projects.value = list
  }
  catch (error) {
    fetchError.value = error
  }
  finally {
    pending.value = false
  }
}

const collecting = ref(false)

async function addFavoriteProject(project: ProjectItem) {
  try {
    collecting.value = true
    const { id } = project || {}
    await $client.protected.addFavoriteProject.mutate({
      projectId: id,
    })
    fetchProjects()
  }
  catch (error) {
    $toast({
      message: JSON.stringify(error),
      type: 'error',
    })
  }
  finally {
    collecting.value = false
  }
}

const deleting = ref(false)
async function removeFavoriteProject(project: ProjectItem) {
  try {
    deleting.value = true
    const { id } = project || {}
    await $client.protected.removeFavoriteProject.mutate({
      projectId: id,
    })
    fetchProjects()
  }
  catch (error) {
    $toast({
      message: JSON.stringify(error),
      type: 'error',
    })
  }
  finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<template>
  <div class="flex items-center gap-4 my-8">
    <div class="join">
      <input class="join-item input input-sm input-bordered w-full">
      <button class="join-item btn btn-sm border-r">
        <Icon icon="heroicons:magnifying-glass-20-solid" />
        Search
      </button>
    </div>
    <NuxtLink class="btn btn-sm btn-neutral" :to="`/dashboard/p/create?tid=${teamId}`">
      Create Project
    </NuxtLink>
  </div>
  <div v-if="pending" class="grid grid-cols-4 gap-4">
    <div v-for="n in 4" :key="n" class="card card-bordered px-8 py-4">
      <div class="skeleton h-12 w-12 rounded-full" />
      <div class="mt-2 space-y-2">
        <div class="skeleton h-4 w-[250px]" />
        <div class="skeleton h-4 w-[100px]" />
      </div>
    </div>
  </div>
  <div v-else-if="fetchError" class="alert alert-error">
    <Icon icon="heroicons:x-circle-solid" />
    <span>{{ JSON.stringify(fetchError) }}</span>
  </div>
  <div v-else-if="!projects?.length" class="mt-20">
    <UIEmpty />
  </div>
  <div
    v-else
    class="grid grid-cols-4 gap-4"
  >
    <div v-for="project in projects" :key="project.id" class="relative">
      <NuxtLink :to="`/project/${project.id}`">
        <div class="card card-bordered px-8 py-4">
          <p class="text-lg">
            {{ project.name }}
          </p>
          <p class="mt-4 h-8 text-xs text-slate-400">
            {{ project.description }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink :to="`/dashboard/p/${project.id}/edit`">
        <Icon icon="mdi:cog" class="absolute top-4 right-4" />
      </NuxtLink>
      <Icon v-if="project.isFavorite" icon="mdi:favorite" class="absolute top-4 right-10" @click="removeFavoriteProject(project)" />
      <Icon v-else icon="mdi:favorite-outline" class="absolute top-4 right-10" @click="addFavoriteProject(project)" />
    </div>
  </div>
</template>
