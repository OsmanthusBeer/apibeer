<script setup>
import { $Enums } from '@prisma/client'

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

const userIds = computed(() => {
  return users.value?.map(u => u.id)
})

const { $client } = useNuxtApp()
const { data: team } = await $client.protected.teamShow.useQuery({
  id: id.value,
})

async function sendInvitation() {
  if (!selectedRole.value)
    return

  // send email
  await $client.protected.teamInvite.useQuery({
    teamId: id.value,
    userIds: userIds.value,
    role: selectedRole.value,
  })
  successModal.showModal()
}
</script>

<template>
  <div class="relative p-8">
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
      <div v-for="role of roles" :key="role" class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">{{ role }}</span>
          <input v-model="selectedRole" type="radio" :value="role" name="userRole" class="radio checked:bg-blue-500">
        </label>
      </div>
    </div>

    <div class="w-full h-[1px] bg-gray-200 mt-2 mb-4" />

    <button class="btn btn-sm btn-neutral mx-auto" type="primary" :loading="sending" :disabled="!selectedRole" @click="sendInvitation">
      Send invitation
    </button>

    <!-- success modal -->
    <dialog id="successModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          Team invite
        </h3>
        <p class="py-4">
          Send email success, please wait user to confirm.
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn" @click="router.go(-1)">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
