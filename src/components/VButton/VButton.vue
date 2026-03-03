<script setup lang="ts">
defineProps<{
    text?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary'
    loading?: boolean
}>()
</script>

<template>
    <button :type="type || 'button'" :disabled="loading" :class="[
        'w-full py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg',
        variant === 'secondary'
            ? 'bg-white/30 text-white hover:bg-white/40'
            : 'bg-white text-gray-900 hover:bg-gray-200',
        loading ? 'opacity-70 cursor-not-allowed' : ''
    ]">
        <span v-if="!loading">
            <slot>{{ text }}</slot>
        </span>

        <span v-else>
            Cargando...
        </span>
    </button>
</template>