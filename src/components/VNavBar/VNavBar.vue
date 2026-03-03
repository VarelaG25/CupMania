<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Trophy, User as UserIcon, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const isOpen = ref(false)

const hideNavbar = computed(() => {
    return route.path === '/login' || route.path === '/register'
})

/* =========================
   MOCK USER + PH
========================= */

const user = ref({
    name: 'Juan Pérez',
    fanPoints: 1750
})

type Rank = {
    name: string
    min: number
    max: number | null
    color: string
    medal: string | null
    special?: string
}

const ranks: Rank[] = [
    {
        name: 'Turista',
        min: 0,
        max: 500,
        color: 'text-white',
        medal: null
    },
    {
        name: 'Fan',
        min: 501,
        max: 1500,
        color: 'text-amber-300',
        medal: '🥉'
    },
    {
        name: 'Hincha Pro',
        min: 1501,
        max: 3000,
        color: 'text-green-300',
        medal: '🥈'
    },
    {
        name: 'Leyenda del Mundial',
        min: 3001,
        max: null,
        color: 'text-yellow-300',
        medal: '🥇',
        special: 'FIFA VIP'
    }
]

const currentRank = computed(() =>
    ranks.find(r =>
        user.value.fanPoints >= r.min &&
        (r.max === null || user.value.fanPoints <= r.max)
    )
)

const closeMenu = () => {
    isOpen.value = false
}
</script>

<template>
    <nav v-if="!hideNavbar"
        class="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500 text-white shadow-lg">

        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <!-- LOGO -->
            <RouterLink to="/" class="flex items-center gap-3 group" @click="closeMenu">
                <Trophy class="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                    <h1 class="text-lg font-bold leading-none">
                        FIFA World Cup 2026
                    </h1>
                    <p class="text-xs text-white/90">
                        Tu guía del Mundial
                    </p>
                </div>
            </RouterLink>

            <!-- LINKS DESKTOP -->
            <div class="hidden md:flex items-center gap-8 font-medium">
                <RouterLink to="/" class="nav-link">Home</RouterLink>
                <RouterLink to="/chats" class="nav-link">Chats</RouterLink>
                <RouterLink to="/task-group" class="nav-link">Tareas</RouterLink>
            </div>

            <!-- USER CARD DESKTOP -->
            <div class="hidden md:block">

                <RouterLink v-if="!user" to="/login" class="px-5 py-2 rounded-xl bg-white/20 border border-white/30
                 hover:bg-white/30 transition text-sm font-semibold">
                    Login
                </RouterLink>

                <RouterLink v-else to="/profile" class="flex items-center gap-3 px-4 py-2 rounded-xl
                 bg-white/20 border border-white/30
                 hover:bg-white/30 transition-all duration-200
                 shadow-md">

                    <!-- Avatar -->
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" :class="[
                        currentRank?.name === 'Leyenda del Mundial'
                            ? 'bg-yellow-400 animate-pulse'
                            : 'bg-white/30'
                    ]">
                        <UserIcon class="w-5 h-5" />
                    </div>

                    <!-- Info -->
                    <div class="flex flex-col leading-tight">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold" :class="currentRank?.color">
                                {{ currentRank?.medal }} {{ user.name }}
                            </span>
                        </div>

                        <span class="text-xs text-white/80">
                            {{ currentRank?.name }} • {{ user.fanPoints }} PH
                        </span>

                        <span v-if="currentRank?.special" class="text-[10px] font-bold text-yellow-200">
                            {{ currentRank.special }}
                        </span>
                    </div>

                </RouterLink>

            </div>

            <!-- MOBILE BUTTON -->
            <button class="md:hidden" @click="isOpen = !isOpen">
                <Menu v-if="!isOpen" class="w-7 h-7" />
                <X v-else class="w-7 h-7" />
            </button>
        </div>

        <!-- MOBILE MENU -->
        <transition name="slide">
            <div v-if="isOpen" class="md:hidden bg-white text-gray-800 shadow-lg">
                <div class="flex flex-col px-6 py-4 space-y-4 font-medium">

                    <RouterLink to="/" @click="closeMenu" class="mobile-link">
                        Home
                    </RouterLink>

                    <RouterLink to="/chats" @click="closeMenu" class="mobile-link">
                        Chats
                    </RouterLink>

                    <RouterLink to="/task-group" @click="closeMenu" class="mobile-link">
                        Tareas
                    </RouterLink>

                    <!-- USER CARD MOBILE -->
                    <div v-if="user" class="mt-4 p-3 bg-gray-100 rounded-xl">
                        <div class="font-bold flex items-center gap-2" :class="currentRank?.color">
                            {{ currentRank?.medal }} {{ user.name }}
                        </div>
                        <div class="text-sm text-gray-600">
                            {{ currentRank?.name }} • {{ user.fanPoints }} PH
                        </div>
                        <div v-if="currentRank?.special" class="text-xs text-yellow-600 font-bold">
                            {{ currentRank.special }}
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
    transition: 0.3s ease;
}

.nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0%;
    height: 2px;
    background: white;
    transition: 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.mobile-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb;
    transition: 0.2s;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>