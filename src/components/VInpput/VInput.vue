<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: Component;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-black/80">
      {{ label }}
    </label>

    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/70"
      />

      <input
        :type="type || 'text'"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/30 border border-black/30 placeholder-black/70 text-black focus:outline-none focus:ring-2 focus:ring-black/60 transition"
      />
    </div>
  </div>
</template>
