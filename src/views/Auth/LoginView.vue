<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Lock } from 'lucide-vue-next'

import BaseInput from '@/components/VInpput/VInput.vue'
import PasswordInput from '@/components/VInpput/VPasswordInput.vue'
import BaseButton from '@/components/VButton/VButton.vue'

const email = ref('')
const password = ref('')
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-600 to-green-500 px-4">
        <div
            class="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 text-white">
            <!-- Title -->
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold">Bienvenido</h2>
                <p class="text-white/80 text-sm mt-2">
                    Inicia sesión para continuar
                </p>
            </div>

            <form class="space-y-5">

                <!-- Email -->
                <BaseInput v-model="email" label="Email" type="email" placeholder="correo@email.com" :icon="Mail" />

                <!-- Password -->
                <PasswordInput v-model="password" label="Contraseña" :icon="Lock" />

                <!-- Forgot password -->
                <div class="text-right text-sm">
                    <RouterLink to="#" class="text-white/80 hover:text-white transition">
                        ¿Olvidaste tu contraseña?
                    </RouterLink>
                </div>

                <!-- Button -->
                <BaseButton type="submit" text="Iniciar Sesión" />

            </form>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-6">
                <div class="flex-1 h-px bg-white/40"></div>
                <span class="text-sm text-white/80">o</span>
                <div class="flex-1 h-px bg-white/40"></div>
            </div>

            <!-- Register link -->
            <p class="text-center text-sm text-white/90">
                ¿No tienes cuenta?
                <RouterLink to="/register" class="font-semibold hover:underline">
                    Regístrate aquí
                </RouterLink>
            </p>

        </div>
    </div>
</template>