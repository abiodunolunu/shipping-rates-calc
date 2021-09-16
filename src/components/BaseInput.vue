<template>
  <div class="base-input">
    <label :for="id" v-if="label">{{ label }}</label>
    <input
      @input="handleInput"
      :value="modelValue"
      :style="{ padding: noPad ? '0' : '' }"
      :type="type || 'text'"
      :placeholder="placeholder"
      :id="id"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | Date | number;
  noPad?: boolean;
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}>();

const emit = defineEmits<{ (e: "update:modelValue", modelValue: string): void }>();

const handleInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.base-input {
  label {
    @apply block text-lg font-bold mb-1;
  }

  input {
    @apply h-12 px-4 rounded-md w-full outline-none;
    border: 1px solid #181818;

    &:focus {
      border: 4px solid rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
