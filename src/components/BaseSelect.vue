<script setup lang="ts">
defineProps<{ label?: string; id?: string; required?: boolean }>();

const emit = defineEmits<{ (e: "update:modelValue", modelValue: string): void }>();

const handleInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
};
</script>
<template>
  <div class="base-select">
    <label :for="id">{{ label }}</label>
    <select :id="id" @input="handleInput" :required="required">
      <slot />
    </select>
  </div>
</template>

<style lang="scss" scoped>
.base-select {
  label {
    @apply block text-lg font-bold mb-1;
  }

  select {
    @apply h-12 px-4 rounded-md w-full;
    border: 1px solid #181818;

    &:focus {
      border: 4px solid rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
