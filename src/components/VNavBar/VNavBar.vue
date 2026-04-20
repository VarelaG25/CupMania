<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // Importamos useRouter
import { useUserStore } from "@/store/userStore";

import {
  Trophy,
  User as UserIcon,
  Menu,
  X,
  LogOut, // Importamos el icono de Logout
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter(); // Instanciamos el router
const isOpen = ref(false);

const userStore = useUserStore();

/* =========================
   NAV VISIBILITY
========================= */

const hideNavbar = computed(() => {
  return route.path === "/login" || route.path === "/register";
});

/* =========================
   LOGOUT LOGIC
========================= */

const handleLogout = () => {
  // Limpiamos sessionStorage
  sessionStorage.removeItem("user");
  // Limpiamos el estado en el store (asegúrate de tener esta acción en tu store)
  userStore.user = null;
  // Cerramos menú si está abierto (móvil)
  closeMenu();
  // Redirigimos al login
  router.push("/login");
};

/* =========================
   RANK SYSTEM
========================= */

type Rank = {
  name: string;
  min: number;
  max: number | null;
  color: string;
  medal: string | null;
  special?: string;
};

const ranks: Rank[] = [
  { name: "Turista", min: 0, max: 500, color: "text-white", medal: null },
  { name: "Fan", min: 501, max: 1500, color: "text-amber-300", medal: "🥉" },
  {
    name: "Hincha Pro",
    min: 1501,
    max: 3000,
    color: "text-green-300",
    medal: "🥈",
  },
  {
    name: "Leyenda del Mundial",
    min: 3001,
    max: null,
    color: "text-yellow-300",
    medal: "🥇",
    special: "FIFA VIP",
  },
];

const currentRank = computed(() => {
  const user = userStore.user;

  const points = user?.fanPoints ?? 0;

  return (
    ranks.find((r) => points >= r.min && (r.max === null || points <= r.max)) ??
    ranks[0]
  );
});

/* =========================
   UI
========================= */

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <nav v-if="!hideNavbar" class="bg-slate-900 shadow-sm">
    <div class="px-6 py-3 flex justify-between items-center">
      <RouterLink
        to="/"
        class="flex items-center gap-3 group"
        @click="closeMenu"
      >
        <div
          class="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition"
        >
          <Trophy class="w-5 h-5 text-green-700" />
        </div>

        <div>
          <h1 class="text-sm font-semibold text-white leading-none">
            FIFA World Cup 2026
          </h1>
          <p class="text-xs text-white/70">Tu guía del Mundial</p>
        </div>
      </RouterLink>

      <div
        class="hidden md:flex items-center gap-6 text-sm font-medium text-white"
      >
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/chats" class="nav-link">Chats</RouterLink>
        <RouterLink to="/task-group" class="nav-link">Tareas</RouterLink>
      </div>

      <div class="hidden md:flex items-center gap-4">
        <RouterLink
          v-if="!userStore.user"
          to="/login"
          class="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition text-sm font-medium"
        >
          Login
        </RouterLink>

        <template v-else>
          <RouterLink
            to="/profile"
            class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-300 transition"
          >
            <div
              class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center"
            >
              <UserIcon class="w-4 h-4 text-white" />
            </div>

            <div class="flex flex-col leading-tight">
              <span class="text-sm font-semibold text-white">
                {{ userStore.user.name }}
              </span>

              <span class="text-xs text-slate-400">
                {{ currentRank.name }}
              </span>
            </div>
          </RouterLink>
          <button
            @click="handleLogout"
            class="p-2 bg-red-400/10 hover:bg-white rounded-lg text-red-400 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut class="w-5 h-5" />
          </button>
        </template>
      </div>

      <button
        class="md:hidden p-2 rounded-lg hover:bg-slate-800"
        @click="isOpen = !isOpen"
      >
        <Menu v-if="!isOpen" class="w-6 h-6 text-white" />
        <X v-else class="w-6 h-6 text-white" />
      </button>
    </div>

    <transition name="slide">
      <div
        v-if="isOpen"
        class="md:hidden bg-slate-900 border-t border-slate-700"
      >
        <div class="flex flex-col px-6 py-4 space-y-2 text-sm text-white">
          <RouterLink to="/" @click="closeMenu" class="mobile-link"
            >Home</RouterLink
          >
          <RouterLink to="/chats" @click="closeMenu" class="mobile-link"
            >Chats</RouterLink
          >
          <RouterLink to="/task-group" @click="closeMenu" class="mobile-link"
            >Tareas</RouterLink
          >

          <div
            v-if="userStore.user"
            class="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700"
          >
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium text-white">
                  {{ userStore.user.name }}
                </div>
                <div class="text-xs text-slate-400">
                  {{ currentRank.name }}
                </div>
              </div>

              <button
                @click="handleLogout"
                class="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-2 rounded-lg font-bold"
              >
                <LogOut class="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
