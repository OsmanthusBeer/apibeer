<script setup lang="ts">
interface ProjectListProp {
  teamId: string
}
const props = withDefaults(defineProps<ProjectListProp>(), {
  teamId: '',
})
const { $client } = useNuxtApp()
// fetch project list
const { pending, error, data: projects } = $client.protected.projectList.useQuery({
  teamId: props.teamId,
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
  <UAlert
    v-else-if="error"
    title="Fetch project list error" icon="i-heroicons-x-circle-solid"
    color="red" variant="outline"
  >
    <template #description>
      {{ JSON.stringify(error) }}
    </template>
  </UAlert>
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
      <NuxtLink :to="`/dashboard/project/${project.id}/edit`">
        <Icon icon="mdi:cog" class="absolute top-4 right-4" />
      </NuxtLink>
    </div>
  </div>
</template>
