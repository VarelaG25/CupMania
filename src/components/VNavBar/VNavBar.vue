<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Trophy, User as UserIcon, Menu, X } from "lucide-vue-next";

const route = useRoute();
const isOpen = ref(false);

const hideNavbar = computed(() => {
  return route.path === "/login" || route.path === "/register";
});

/* =========================
   MOCK USER + PH
========================= */

const user = ref({
  name: "Juan Pérez",
  fanPoints: 1750,
});

type Rank = {
  name: string;
  min: number;
  max: number | null;
  color: string;
  medal: string | null;
  special?: string;
};

const ranks: Rank[] = [
  {
    name: "Turista",
    min: 0,
    max: 500,
    color: "text-white",
    medal: null,
  },
  {
    name: "Fan",
    min: 501,
    max: 1500,
    color: "text-amber-300",
    medal: "🥉",
  },
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

const currentRank = computed(() =>
  ranks.find(
    (r) =>
      user.value.fanPoints >= r.min &&
      (r.max === null || user.value.fanPoints <= r.max),
  ),
);

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <nav v-if="!hideNavbar" class="bg-slate-900 shadow-sm">
    <div class="px-6 py-3 flex justify-between items-center">
      <!-- LOGO -->
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

      <!-- LINKS DESKTOP -->
      <div
        class="hidden md:flex items-center gap-6 text-sm font-medium text-white"
      >
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/chats" class="nav-link">Chats</RouterLink>
        <RouterLink to="/task-group" class="nav-link">Tareas</RouterLink>
      </div>

      <!-- USER DESKTOP -->
      <div class="hidden md:block">
        <RouterLink
          v-if="!user"
          to="/login"
          class="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition text-sm font-medium"
        >
          Login
        </RouterLink>

        <RouterLink
          v-else
          to="/profile"
          class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
        >
          <div
            class="border border-slate-300 w-9 h-9 rounded-full bg-green-100 flex items-center justify-center"
          >
            <UserIcon class="w-4 h-4 text-green-700" />
          </div>

          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold text-slate-800">
              {{ user.name }}
            </span>

            <span class="text-xs text-slate-600">
              {{ currentRank?.name }} • {{ user.fanPoints }} PH
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- MOBILE BUTTON -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-slate-800 transition"
        @click="isOpen = !isOpen"
      >
        <Menu v-if="!isOpen" class="w-6 h-6 text-white" />
        <X v-else class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- MOBILE MENU (MATCH NAV BG) -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="md:hidden bg-slate-900 border-t border-slate-700"
      >
        <div class="flex flex-col px-6 py-4 space-y-2 text-sm text-white">
          <RouterLink to="/" @click="closeMenu" class="mobile-link">
            Home
          </RouterLink>

          <RouterLink to="/chats" @click="closeMenu" class="mobile-link">
            Chats
          </RouterLink>

          <RouterLink to="/task-group" @click="closeMenu" class="mobile-link">
            Tareas
          </RouterLink>

          <!-- USER MOBILE -->
          <div
            v-if="user"
            class="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700"
          >
            <div class="font-medium text-white">
              {{ user.name }}
            </div>

            <div class="text-xs text-slate-300">
              {{ currentRank?.name }} • {{ user.fanPoints }} PH
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #d2ffb7;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background: #d2ffb7;
  transition: 0.25s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.mobile-link {
  padding: 0.75rem 0;
  border-bottom: 1px solid #334155;
  transition: color 0.2s ease;
}

.mobile-link:hover {
  color: #d2ffb7;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
