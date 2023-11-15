<script setup>
definePageMeta({
  layout: 'blank',
})

const route = useRoute()
const router = useRouter()
const id = ref(route.query.id)

const { $client } = useNuxtApp()
const { data } = await $client.protected.teamMemberShow.useQuery({
  id: id.value,
})

async function confirm() {
  // confirm
  await $client.protected.teamInviteConfirm.useQuery({
    id: id.value,
  })
  router.push({
    path: '/dashboard',
  })
}
</script>

<template>
  <div class="relative p-8">
    <h1>Hi, {{ data.username }}, Do you confirm to join team {{ data.teamname }}?</h1>
    <button class="btn btn-sm btn-neutral my-10" type="primary" @click="confirm">
      Confirm
    </button>
  </div>
</template>
