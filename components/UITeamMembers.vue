<script setup lang="ts">
const props = withDefaults(defineProps<{
  teamId: string
}>(), {
  teamId: '',
})
const { $client } = useNuxtApp()
// fetch team members
const { pending, error, data: members } = $client.protected.teamMembers.useQuery({
  teamId: props.teamId,
})

const modalInvite = ref(false)

function inviteMembers() {
  modalInvite.value = true
}
</script>

<template>
  <UIModalInvite v-model="modalInvite" :team-id="props.teamId" />
  <div class="flex items-center gap-4 my-8">
    <div class="join">
      <input class="join-item input input-sm input-bordered w-full">
      <button class="join-item btn btn-sm border-r">
        <Icon icon="heroicons:magnifying-glass-20-solid" />
        Search
      </button>
    </div>
    <button class="btn btn-sm btn-neutral" @click="inviteMembers">
      Invite Members
    </button>
  </div>
  <div v-if="pending" class="grid grid-cols-4 gap-4">
    <div v-for="n in 4" :key="n" class="card card-bordered px-8 py-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="mt-2 space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[100px]" />
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
