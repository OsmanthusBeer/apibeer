<script setup lang="ts">
const { user, logout } = useSessionUser()

const links = computed(() => {
  return [
    {
      label: 'Get Started',
      to: '/get-started',
      target: '_blank',
    },
    {
      label: 'Roadmap',
      to: '/roadmap',
      target: '_blank',
    },
    {
      label: 'Tech Stack',
      to: '/use',
      target: '_blank',
    },
  ]
})

const dropdownItems = computed(() => ([
  [
    {
      label: user.value!.email,
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Dashboard',
      icon: 'i-mdi-desktop-mac-dashboard',
      shortcuts: ['D'],
      click: () => {
        navigateTo('/dashboard')
      },
    },
    {
      label: 'Settings',
      icon: 'i-mdi-cog',
      shortcuts: ['S'],
      click: () => {
        useToast().add({ title: 'TODO:' })
      },
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-mdi-logout',
      click: () => logout(),
    },
  ],
]))
</script>

<template>
  <div class="w-full h-16 px-20 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
    <NuxtLink to="/" class="flex items-end font-bold text-xl" aria-label="Nuxt UI">
      <UILogo />
    </NuxtLink>

    <ul class="flex justify-end flex-1">
      <NuxtLink
        v-for="(link, index) in links" :key="index" icon="i-heroicons-lock-closed" :to="link.to"
        class="flex items-end gap-1.5 font-bold"
      >
        <li class="text-sm font-semibold mr-6">
          {{ link.label }}
        </li>
      </NuxtLink>
    </ul>

    <UIButtonToggleTheme />

    <NuxtLink class="btn btn-ghost" to="https://github.com/OsmanthusBeer/apibeer">
      <Icon icon="mdi:github" />
    </NuxtLink>

    <div class="flex ml-6 pl-6 border-l">
      <UDropdown
        v-if="user" :items="dropdownItems"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar :src="user.avatar" />
        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdown>
      <button v-else class="btn btn-neutral" to="/login">
        Login
      </button>
    </div>
  </div>
</template>
