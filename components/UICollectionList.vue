<script lang="ts" setup>
const { $client } = useNuxtApp()
// fetch project list
const { pending, error, data: projects } = $client.protected.favoriteProjects.useQuery()
</script>

<template>
  <div v-if="pending" class="flex flex-wrap">
    <div v-for="n in 4" :key="n" class="card card-compact w-80 h-40 bg-base-100 shadow-xl mt-10 ml-10">
      <div class="card-body skeleton" />
    </div>
  </div>
  <div v-else-if="error" class="alert alert-error">
    <Icon icon="heroicons:x-circle-solid" />
    <span>{{ JSON.stringify(error) }}</span>
  </div>
  <div v-else-if="!projects?.length" class="mt-20">
    <UIEmpty />
  </div>
  <div v-else class="flex flex-wrap">
    <NuxtLink v-for="(item, index) in projects" :key="`visited_item__${index}`" :to="`/dashboard/p/${item?.project?.id}/edit`" class="card card-compact w-80 bg-base-100 shadow-xl mt-10 ml-10">
      <div class="card-body">
        <h2 class="card-title">
          {{ item?.project?.name }}
        </h2>
        <p>{{ item?.project?.description }}</p>
        <div class="card-actions justify-end">
          <Icon icon="mdi:cog" class="absolute top-4 right-4" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
