<script setup lang="ts">
const { user } = useSessionUser()
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
</script>

<template>
  <div class="w-full h-16 px-20 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
    <NuxtLink
      to="/"
      class="flex items-end font-bold text-xl"
      aria-label="Nuxt UI"
    >
      <Logo />
    </NuxtLink>

    <ul class="flex justify-end flex-1">
      <NuxtLink
        v-for="(link, index) in links"
        :key="index" icon="i-heroicons-lock-closed"
        :to="link.to"
        class="flex items-end gap-1.5 font-bold"
      >
        <li class="text-sm font-semibold mr-6">
          {{ link.label }}
        </li>
      </NuxtLink>
    </ul>

    <ColorModeButton />

    <UButton
      to="https://github.com/OsmanthusBeer/api-beer"
      icon="i-mdi-github"
      variant="ghost"
      aria-label="Github"
    />

    <div class="flex ml-6 pl-6 border-l">
      <NuxtLink v-if="user" to="/dashboard" class="flex items-center gap-2 cursor-pointer">
        <!-- TODO: Use `gavatar` -->
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
      </NuxtLink>
      <UButton v-else to="/login">
        Login
      </UButton>
    </div>
  </div>
</template>
