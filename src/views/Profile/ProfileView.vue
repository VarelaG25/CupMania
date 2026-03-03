<script setup lang="ts">
import { computed, ref } from 'vue'
import { Trophy, Star, Medal, Flame, Crown } from 'lucide-vue-next'

/* =========================
   USER MOCK
========================= */

const user = ref({
  name: 'Juan Pérez',
  email: 'juan@email.com',
  fanPoints: 1750,
  streak: 5,
  completedTasks: 12,
  missionsCompleted: 3
})

/* =========================
   RANGOS
========================= */

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
    color: 'text-gray-700',
    medal: null
  },
  {
    name: 'Fan',
    min: 501,
    max: 1500,
    color: 'text-amber-600',
    medal: '🥉'
  },
  {
    name: 'Hincha Pro',
    min: 1501,
    max: 3000,
    color: 'text-green-500',
    medal: '🥈'
  },
  {
    name: 'Leyenda del Mundial',
    min: 3001,
    max: null,
    color: 'text-yellow-500',
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

const nextRank = computed(() => {
  const index = ranks.findIndex(r => r.name === currentRank.value?.name)
  return ranks[index + 1] || null
})

const progressToNext = computed(() => {
  if (!nextRank.value) return 100
  return Math.min(
    100,
    Math.round(
      ((user.value.fanPoints - currentRank.value!.min) /
        (nextRank.value.min - currentRank.value!.min)) * 100
    )
  )
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">

    <div class="max-w-5xl mx-auto">

      <!-- PERFIL CARD -->
      <div class="bg-white shadow-xl rounded-3xl p-8 mb-8">

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <!-- Avatar -->
          <div class="flex items-center gap-6">
            <div
              class="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white"
              :class="currentRank?.name === 'Leyenda del Mundial'
                ? 'bg-yellow-500 animate-pulse'
                : 'bg-gradient-to-br from-blue-600 to-purple-600'">

              {{ user.name.charAt(0) }}
            </div>

            <div>
              <h1 class="text-3xl font-bold flex items-center gap-2"
                  :class="currentRank?.color">
                {{ currentRank?.medal }} {{ user.name }}
              </h1>

              <p class="text-gray-500">
                {{ user.email }}
              </p>

              <p class="mt-2 font-semibold">
                {{ currentRank?.name }}
              </p>

              <p v-if="currentRank?.special"
                 class="text-yellow-500 font-bold text-sm">
                {{ currentRank.special }}
              </p>
            </div>
          </div>

          <!-- PH -->
          <div class="text-right">
            <p class="text-sm text-gray-500">Puntos de Hincha</p>
            <p class="text-4xl font-bold text-purple-600">
              {{ user.fanPoints }} PH
            </p>
          </div>

        </div>

        <!-- Barra progreso -->
        <div v-if="nextRank" class="mt-8">
          <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-700"
              :style="{ width: progressToNext + '%' }">
            </div>
          </div>

          <p class="text-sm text-gray-600 mt-2">
            Próximo rango: <strong>{{ nextRank.name }}</strong>
            ({{ nextRank.min }} PH)
          </p>
        </div>

      </div>

      <!-- ESTADÍSTICAS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <Trophy class="w-10 h-10 text-purple-600" />
          <div>
            <p class="text-2xl font-bold">
              {{ user.completedTasks }}
            </p>
            <p class="text-gray-600 text-sm">
              Tareas completadas
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <Star class="w-10 h-10 text-blue-600" />
          <div>
            <p class="text-2xl font-bold">
              {{ user.missionsCompleted }}
            </p>
            <p class="text-gray-600 text-sm">
              Misiones Mundial
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <Flame class="w-10 h-10 text-orange-500" />
          <div>
            <p class="text-2xl font-bold">
              {{ user.streak }}
            </p>
            <p class="text-gray-600 text-sm">
              Días de racha
            </p>
          </div>
        </div>

      </div>

      <!-- LOGROS -->
      <div class="mt-10 bg-white p-8 rounded-3xl shadow-xl">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <Medal class="w-6 h-6 text-yellow-500" />
          Logros Desbloqueados
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="p-4 border rounded-xl">
            🥉 Primer Nivel Alcanzado
          </div>

          <div class="p-4 border rounded-xl">
            🔥 5 Días de Racha
          </div>

          <div v-if="currentRank?.name === 'Hincha Pro' || currentRank?.name === 'Leyenda del Mundial'"
               class="p-4 border rounded-xl bg-green-50">
            🥈 Hincha Pro Desbloqueado
          </div>

          <div v-if="currentRank?.name === 'Leyenda del Mundial'"
               class="p-4 border rounded-xl bg-yellow-50">
            <Crown class="inline w-4 h-4 mr-2" />
            Leyenda del Mundial
          </div>

        </div>
      </div>

    </div>
  </div>
</template>