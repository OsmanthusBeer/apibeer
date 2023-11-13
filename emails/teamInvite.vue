<script lang="ts" setup>
defineProps<{ id: string; confirmUrl: string }>()
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="https://cdn-icons-png.flaticon.com/512/5234/5234972.png" alt="invite"></figure>
    <div class="card-body">
      <h2 class="card-title">
        Hi!
      </h2>
      <p>Do you confirm to join team?</p>
      <div class="card-actions justify-end">
        <a :href="confirmUrl" target="_blank" class="btn btn-primary">
          Confirm
        </a>
      </div>
    </div>
  </div>
</template>
