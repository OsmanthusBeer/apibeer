<script lang="ts" setup>
definePageMeta({
  title: 'Home',
  requiredAuth: false,
})

const colorMode = useColorMode()
</script>

<template>
  <iframe class="w-full min-h-[100vh]" :src="`https://volta.net/embed/eyJ2aWV3IjoiYm9hcmQiLCJib2FyZFN0YXR1c2VzIjpbInRyaWFnZSIsInRvZG8iLCJpbl9wcm9ncmVzcyIsImluX3JldmlldyIsImRvbmUiLCJyZWxlYXNlZCIsImNhbmNlbGxlZCJdLCJib2FyZExpbmtlZFBycyI6dHJ1ZSwibGlzdEdyb3VwIjoic3RhdHVzIiwibGlzdE9yZGVyIjoiY3JlYXRlZF9hdCIsInRpbWVsaW5lWm9vbSI6Im1vbnRoIiwidGltZWxpbmVPcmRlciI6InN0YXRlIiwidGltZWxpbmVEaXNwbGF5IjoiYWxsX21pbGVzdG9uZXMiLCJmaWx0ZXJzIjp7fSwib3duZXIiOiJPc21hbnRodXNCZWVyIiwibmFtZSI6ImFwaS1iZWVyIn0=?theme=${colorMode}&gray=slate&primary=green`" />
</template>
