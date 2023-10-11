<script setup>
definePageMeta({
  layout: 'entry-sidebar',
})

const { currentTeam } = useTeam()

const { $client } = useNuxtApp()

const { pending, error, data: projects } = $client.protected.projectList.useQuery()
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl pb-4 font-semibold border-b border-gray-200 dark:border-gray-800">
      {{ currentTeam?.name }}
    </h1>

    <div class="flex items-center my-8">
      <UInput class="w-44 mr-4" icon="i-heroicons-magnifying-glass-20-solid" size="sm" color="white" :trailing="false" />
      <UButton @click="navigateTo('/p/create')">
        Create Project
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
    <div
      v-else
      class="grid grid-cols-4 gap-4"
    >
      <NuxtLink
        v-for="project in projects" :key="project.id"
        v-slot="{ navigate }" :to="{ path: `/p/${project.id}` }"
        custom
      >
        <UCard
          class="space-y-2 cursor-pointer"
          @click="navigate"
        >
          <p>{{ project.name }}</p>
          <p class="text-xs text-slate-400">
            {{ project.description }}
          </p>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
