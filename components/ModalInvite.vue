<script lang="ts" setup>
import type { User } from '@prisma/client'

const props = withDefaults(defineProps<{
  teamId?: string
}>(), {
  teamId: '',
})
const { $client } = useNuxtApp()
const toast = useToast()

const modelValue = defineModel<boolean>({ default: false })
const loading = ref(false)

const users = ref<Array<User>>([])
const selected = ref([])

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  if (!value)
    return
  fetchUserList(value)
}

async function fetchUserList(keyword: string) {
  if (!keyword)
    return

  try {
    loading.value = true
    const data = await $client.protected.userList.query({
      teamId: props.teamId,
      keyword,
    })
    users.value = data
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

function onInvite() {
  // TODO: send email
  modelValue.value = false
  navigateTo(`/dashboard/t/${props.teamId}/invitations?users=${JSON.stringify(selected.value.map((u: User) => {
    return {
      id: u.id,
      username: u.username,
    }
  }))}`)
}
</script>

<template>
  <div class="w-28">
    <UModal v-model="modelValue" class="text-red" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Invite member
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modelValue = false" />
          </div>
        </template>
        <UCommandPalette
          v-model="selected"
          placeholder="Search by username or email address"
          multiple
          nullable
          :autoclear="false"
          :autoselect="false"
          group-attribute="username"
          command-attribute="username"
          :groups="[{ key: 'users', commands: users }]"
          :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
          @input="onInput"
        />
        <div class="mt-4 text-right">
          <UButton class="" :disabled="!selected.length" @click="onInvite">
            Invite
          </UButton>
          <UButton variant="outline" class="ml-4" @click="modelValue = false">
            Cancel
          </UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
