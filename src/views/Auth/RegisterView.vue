<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-vue-next";
import { io, Socket } from "socket.io-client";

import BaseInput from "@/components/VInpput/VInput.vue";
import PasswordInput from "@/components/VInpput/VPasswordInput.vue";
import BaseButton from "@/components/VButton/VButton.vue";

const router = useRouter();
const API_URL = "http://localhost:3000";
let socket: Socket;

// --- ESTADOS ---
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

// Estado para el Alert estilizado
const status = ref<{ type: "success" | "error" | null; message: string }>({
  type: null,
  message: "",
});

// --- CONFIGURACIÓN DE SOCKET ---
onMounted(() => {
  // Inicialización única con fallback de polling para evitar errores de handshake
  socket = io(API_URL, {
    transports: ["polling", "websocket"],
  });

  socket.on("connect", () => console.log("✅ Conectado:", socket.id));

  socket.on(
    "register_response",
    (response: { success: boolean; message: string }) => {
      isLoading.value = false;

      if (response.success) {
        status.value = {
          type: "success",
          message: "¡Registro exitoso! Redirigiendo...",
        };
        // Redirigir después de 2 segundos para que el usuario vea el mensaje
        setTimeout(() => router.push("/login"), 2000);
      } else {
        status.value = { type: "error", message: response.message };
      }
    },
  );

  socket.on("connect_error", () => {
    isLoading.value = false;
    status.value = {
      type: "error",
      message: "Error de conexión con el servidor.",
    };
  });
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});

// --- VALIDACIONES ---
const passwordsMatch = computed(() => {
  return (
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

const isFormValid = computed(() => {
  return (
    name.value.trim().length > 2 &&
    email.value.includes("@") &&
    password.value.length >= 6 &&
    passwordsMatch.value
  );
});

// --- ENVÍO ---
const handleRegister = () => {
  console.log("Intentando registrar...", {
    isValid: isFormValid.value,
    data: { name: name.value, email: email.value },
  });

  if (!isFormValid.value) {
    status.value = {
      type: "error",
      message: "Formulario inválido. Revisa los campos.",
    };
    return;
  }

  isLoading.value = true;
  status.value = { type: null, message: "" }; // Limpiar alertas previas

  socket.emit("register_user", {
    id: `user_${Date.now()}`,
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: name.value.charAt(0).toUpperCase(),
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
        <h2 class="text-3xl font-bold">Crear Cuenta</h2>
        <p class="text-white/80 text-sm mt-2">Regístrate para comenzar</p>
      </div>

      <Transition name="fade">
        <div
          v-if="status.type"
          :class="[
            'mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border animate-in fade-in zoom-in duration-300',
            status.type === 'error'
              ? 'bg-red-500/20 border-red-400/50 text-red-100'
              : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-100',
          ]"
        >
          <AlertCircle
            v-if="status.type === 'error'"
            class="w-5 h-5 shrink-0"
          />
          <CheckCircle2 v-else class="w-5 h-5 shrink-0" />
          {{ status.message }}
        </div>
      </Transition>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <BaseInput
          v-model="name"
          label="Nombre"
          placeholder="Tu nombre"
          :icon="User"
          defaultClass="text-white/70 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition placeholder:text-white/40"
          default-class-icon="text-white/70"
          default-class-label="text-white/90"
        />

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

        <div>
          <PasswordInput
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            :icon="Lock"
          />
          <p
            v-if="confirmPassword && !passwordsMatch"
            class="text-red-300 text-xs mt-1"
          >
            Las contraseñas no coinciden
          </p>
        </div>

        <button
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="w-full p-3 rounded-xl font-bold"
          :class="
            !isFormValid ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600'
          "
        >
          {{ isLoading ? "Cargando..." : "Crear Cuenta" }}
        </button>
      </form>

      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-white/40"></div>
        <span class="text-sm text-white/80">o</span>
        <div class="flex-1 h-px bg-white/40"></div>
      </div>

      <p class="text-center text-sm text-white/90">
        ¿Ya tienes cuenta?
        <RouterLink to="/login" class="font-semibold hover:underline"
          >Inicia sesión aquí</RouterLink
        >
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
