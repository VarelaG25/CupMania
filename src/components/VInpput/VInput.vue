<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
    modelValue: string
    label?: string
    type?: string
    placeholder?: string
    icon?: Component
}>()

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="space-y-2">
        <label v-if="label" class="block text-sm font-medium text-white/90">
            {{ label }}
        </label>

        <div class="relative">
            <component v-if="icon" :is="icon" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />

            <input :type="type || 'text'" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :placeholder="placeholder" class="w-full
               pl-10 pr-4 py-3
               rounded-xl
               bg-white/30
               border border-white/30
               placeholder-white/70
               text-white
               focus:outline-none
               focus:ring-2
               focus:ring-white/60
               transition" />
        </div>
    </div>
</template>