<script lang="ts" setup>
const { locale } = useI18n()
const languages = ref([
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Chinese',
    value: 'cn',
  },
])
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <USelect v-model="locale" :options="languages" option-attribute="name" />
    <p class="mt-5">
      {{ $t('welcome') }}
    </p>
  </div>
</template>
