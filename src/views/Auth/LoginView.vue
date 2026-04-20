<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { io, Socket } from "socket.io-client";

import { useUserStore } from "@/store/userStore";

import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-vue-next";

import BaseInput from "@/components/VInpput/VInput.vue";
import PasswordInput from "@/components/VInpput/VPasswordInput.vue";
import BaseButton from "@/components/VButton/VButton.vue";

const router = useRouter();
const userStore = useUserStore();

const API_URL = "http://localhost:3000";
let socket: Socket;

// --- ESTADOS ---
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const statusMessage = ref({ type: "", text: "" });

onMounted(() => {
  socket = io(API_URL);

  socket.on(
    "login_response",
    (response: { success: boolean; message: string; user?: any }) => {
      isLoading.value = false;

      if (response.success && response.user) {
        const userData = {
          ...response.user,
          fanPoints: 1200, // dummy ranking
        };

        // 👇 PINIA
        userStore.setUser(userData);

        // 👇 persistencia
        sessionStorage.setItem("user", JSON.stringify(userData));

        statusMessage.value = {
          type: "success",
          text: "¡Bienvenido de nuevo!",
        };

        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        statusMessage.value = { type: "error", text: response.message };
      }
    },
  );
});

const goHome = () => {
  router.push("/");
};

onUnmounted(() => {
  if (socket) socket.disconnect();
});

const handleLogin = () => {
  if (!email.value || !password.value) {
    statusMessage.value = {
      type: "error",
      text: "Por favor, completa todos los campos.",
    };
    return;
  }

  isLoading.value = true;
  statusMessage.value = { type: "", text: "" };

  socket.emit("login_user", {
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-600 to-green-500 px-4"
  >
    <div
      class="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 text-white"
    >
      <div class="text-center mb-8">
        <button
          @click="goHome"
          class="text-white/80 hover:text-white text-sm transition absolute left-4 top-4 bg-transparent border border-white/30 px-3 py-1 rounded-lg"
        >
          ← Volver al inicio
        </button>

        <h2 class="text-3xl font-bold mt-4">Bienvenido</h2>
        <p class="text-white/80 text-sm mt-2">Inicia sesión para continuar</p>
      </div>

      <Transition name="fade">
        <div
          v-if="statusMessage.text"
          :class="[
            'mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border animate-in fade-in zoom-in duration-300',
            statusMessage.type === 'error'
              ? 'bg-red-500/20 border-red-400/50 text-red-100'
              : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-100',
          ]"
        >
          <AlertCircle
            v-if="statusMessage.type === 'error'"
            class="w-5 h-5 shrink-0"
          />
          <CheckCircle2 v-else class="w-5 h-5 shrink-0" />
          {{ statusMessage.text }}
        </div>
      </Transition>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="correo@email.com"
          :icon="Mail"
          defaultClass="text-white/70 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition placeholder:text-white/40"
          default-class-icon="text-white/70"
          default-class-label="text-white/90"
        />

        <PasswordInput v-model="password" label="Contraseña" :icon="Lock" />

        <BaseButton
          type="submit"
          :disabled="isLoading"
          :text="isLoading ? '' : 'Iniciar Sesión'"
        >
          <template v-if="isLoading">
            <Loader2 class="w-5 h-5 animate-spin mx-auto" />
          </template>
        </BaseButton>
      </form>

      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-white/40"></div>
        <span class="text-sm text-white/80">o</span>
        <div class="flex-1 h-px bg-white/40"></div>
      </div>

      <p class="text-center text-sm text-white/90">
        ¿No tienes cuenta?
        <RouterLink to="/register" class="font-semibold hover:underline">
          Regístrate aquí
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
