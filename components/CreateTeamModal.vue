<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const emits = defineEmits(['submit'])
defineExpose({
  show,
})
const isOpen = ref(false)

const form = ref<{ name: string | undefined }>({
  name: undefined,
})

const formRef = ref()

function show() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function validate(form: any): FormError[] {
  const errors = []
  if (!form.name)
    errors.push({ path: 'name', message: 'Required' })
  return errors
}

function submit(event: FormSubmitEvent<any>) {
  emits('submit', { ...event.data })
  formRef.value.clear()
  close()
}
</script>

<template>
  <div class="w-28">
    <UModal v-model="isOpen" class="text-red" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create Team
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="close" />
          </div>
        </template>
        <UForm
          ref="formRef"
          :validate="validate"
          :state="form"
          @submit="submit"
        >
          <UFormGroup label="Team name" name="name">
            <UInput v-model="form.name" class="mt-4" />
          </UFormGroup>

          <div class="mt-4 text-right">
            <UButton type="submit" class="">
              Submit
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
