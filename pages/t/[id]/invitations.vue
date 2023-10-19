<script setup>
import { $Enums } from '@prisma/client';

definePageMeta({
  layout: 'dashboard',
})

const roles = ref(Object.keys($Enums.Role))
const sending = ref(false)
const selectedRole = ref('')

const route = useRoute()
const id = ref(route.params.id)
const users = ref(JSON.parse(route.query.users))

const usersName = computed(() => {
  return users.value?.map(u => u.username).join(',') || ''
})

const { $client } = useNuxtApp()
const { data: team } = await $client.protected.teamShow.useQuery({
  id: id.value,
})

function sendInvitation() {
  // todo send email
}
</script>

<template>
  <div class="relative w-[440px] my-10 mx-auto">
    <h1 class="text-[24px] font-400 leading-1">
      Invite <span class="font-semibold">{{ usersName }}</span> to {{ team.name }}
    </h1>
    <div class="w-full h-[1px] bg-gray-200 mt-2 mb-4" />
    <p class="text-[16px] leading-6 mb-4">
      Give them an appropriate role in the team.
    </p>
    <h3 class="mt-8 text-[20px] font-semibold leading-8">
      Role in the team
    </h3>
    <div class="mt-4 mb-4">
      <URadio v-for="role of roles" :key="role" v-model="selectedRole" class="mt-4" v-bind="role" :name="role" :value="role" :label="role" />
    </div>

    <div class="w-full h-[1px] bg-gray-200 mt-2 mb-4" />

    <UButton type="primary" :loading="sending" class="mx-auto" :disabled="!selectedRole" @click="sendInvitation">
      Send invitation
    </UButton>
  </div>
</template>
