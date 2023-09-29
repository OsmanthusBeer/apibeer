<script lang="ts" setup>
defineProps<{ url: string }>()
</script>

<template>
  <EHtml lang="en">
    <EHeading level="1">
      Hi!
    </EHeading>
    <EText class="text-#999">
      This is a test email. You can view the source code on GitHub.
    </EText>
    <ERow>
      View on
      <ELink :href="url">
        GitHub
      </ELink>
    </ERow>
  </EHtml>
</template>
