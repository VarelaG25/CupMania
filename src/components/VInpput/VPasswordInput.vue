<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import type { Component } from 'vue'

const props = defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    icon?: Component
}>()

defineEmits(['update:modelValue'])

const show = ref(false)
</script>

<template>
    <div class="space-y-2">
        <label v-if="label" class="block text-sm font-medium text-white/90">
            {{ label }}
        </label>

        <div class="relative">
            <component v-if="icon" :is="icon" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />

            <input :type="show ? 'text' : 'password'" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :placeholder="placeholder || '••••••••'" class="w-full
               pl-10 pr-12 py-3
               rounded-xl
               bg-white/30
               border border-white/30
               placeholder-white/70
               text-white
               focus:outline-none
               focus:ring-2
               focus:ring-white/60
               transition" />

            <button type="button" @click="show = !show" class="absolute right-3 top-1/2 -translate-y-1/2
               text-white/80
               hover:text-white
               transition">
                <Eye v-if="!show" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>