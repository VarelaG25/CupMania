<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: Component;
  defaultClass?: string;
  defaultClassLabel?: string;
  defaultClassIcon?: string;
}>();

defineEmits(["update:modelValue"]);

// Lógica de clases del Input
const inputClasses = computed(() => {
  const baseClasses =
    "w-full py-3 rounded-xl bg-white/30 border border-black/30 focus:outline-none focus:ring-2 focus:ring-black/60 transition";
  const defaultColors = !props.defaultClass
    ? "text-black placeholder-black/70"
    : "";
  // Forzamos el padding izquierdo si hay icono para que el texto no se encime
  const paddingClasses = props.icon ? "pl-10 pr-4" : "px-4";

  return `${baseClasses} ${paddingClasses} ${defaultColors} ${props.defaultClass || ""}`;
});

// Lógica de clases del Icono (Para que siempre sea absoluto)
const iconClasses = computed(() => {
  // Estas clases son obligatorias para que se mantenga ADENTRO
  const structuralClasses =
    "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none";
  // Estas son las estéticas (color/tamaño) que se pueden sobrescribir
  const appearanceClasses = props.defaultClassIcon || "w-5 h-5 text-black/70";

  return `${structuralClasses} ${appearanceClasses}`;
});
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :class="
        props.defaultClassLabel || 'block text-sm font-medium text-black/80'
      "
    >
      {{ label }}
    </label>

    <div class="relative w-full flex items-center">
      <component v-if="icon" :is="icon" :class="iconClasses" />

      <input
        :type="type || 'text'"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        :class="inputClasses"
      />
    </div>
  </div>
</template>
