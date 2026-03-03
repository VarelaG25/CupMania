<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  Clock
} from 'lucide-vue-next'

/* =========================
   MOCK TAREAS
========================= */

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate: Date
  assignedTo: string[]
  points: number
}

const taskList = ref<Task[]>([
  {
    id: '1',
    title: 'Reservar hotel',
    description: 'Confirmar alojamiento del grupo',
    completed: false,
    priority: 'high',
    dueDate: new Date(),
    assignedTo: ['Carlos', 'Ana'],
    points: 100
  },
  {
    id: '2',
    title: 'Comprar camisetas',
    description: 'Camisetas oficiales del equipo',
    completed: true,
    priority: 'medium',
    dueDate: new Date(),
    assignedTo: ['Luis'],
    points: 100
  }
])

const toggleTaskCompletion = (taskId: string) => {
  taskList.value = taskList.value.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  )
}

/* =========================
   SISTEMA PH
========================= */

const fanPoints = computed(() =>
  taskList.value
    .filter(t => t.completed)
    .reduce((acc, task) => acc + task.points, 0)
)

type Rank = {
  name: string
  min: number
  max: number | null
  color: string
  medal: string | null
  perks: string[]
}

const ranks: Rank[] = [
  {
    name: 'Turista',
    min: 0,
    max: 500,
    color: 'text-gray-800',
    medal: null,
    perks: ['Nombre estándar', 'Sin medalla']
  },
  {
    name: 'Fan',
    min: 501,
    max: 1500,
    color: 'text-amber-600',
    medal: '🥉',
    perks: ['Medalla de bronce', 'Borde de avatar bronce']
  },
  {
    name: 'Hincha Pro',
    min: 1501,
    max: 3000,
    color: 'text-green-500',
    medal: '🥈',
    perks: [
      'Medalla de plata',
      'Banner especial',
      'Nombre verde vibrante'
    ]
  },
  {
    name: 'Leyenda del Mundial',
    min: 3001,
    max: null,
    color: 'text-yellow-400',
    medal: '🥇',
    perks: [
      'Medalla de oro',
      'Avatar animado dorado',
      'Estado "FIFA VIP"'
    ]
  }
]

const currentRank = computed(() =>
  ranks.find(r =>
    fanPoints.value >= r.min &&
    (r.max === null || fanPoints.value <= r.max)
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
      ((fanPoints.value - currentRank.value!.min) /
        (nextRank.value.min - currentRank.value!.min)) * 100
    )
  )
})

const showRewards = ref(false)

/* =========================
   COMPUTED TAREAS
========================= */

const pendingTasks = computed(() =>
  taskList.value.filter(t => !t.completed)
)

const completedTasks = computed(() =>
  taskList.value.filter(t => t.completed)
)
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- HEADER -->
    <header
      class="bg-gradient-to-r from-blue-700 via-purple-600 to-green-500 text-white shadow-lg">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div class="flex items-center gap-3">
          <ArrowLeft class="w-6 h-6" />
          <div>
            <h1 class="text-xl font-bold">Tareas Grupales</h1>
            <p class="text-xs opacity-90">Sistema Mundial 2026</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="showRewards = true"
            class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
            🎁 Rewards
          </button>

          <button
            class="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
            <Plus class="w-5 h-5" />
            Nueva
          </button>
        </div>

      </div>
    </header>

    <div class="max-w-4xl mx-auto px-6 py-8">

      <!-- PUNTOS -->
      <div
        class="mb-6 p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">Tus PH</h2>
            <p class="opacity-90">Puntos de Hincha acumulados</p>
          </div>
          <div class="text-4xl font-bold">
            {{ fanPoints }} PH
          </div>
        </div>
      </div>

      <!-- PENDIENTES -->
      <div v-if="pendingTasks.length" class="mb-8">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock class="w-6 h-6 text-blue-700" />
          Pendientes
        </h2>

        <div class="space-y-3">
          <div v-for="task in pendingTasks"
               :key="task.id"
               class="p-4 bg-white shadow rounded-xl">

            <div class="flex gap-4">
              <input type="checkbox"
                     :checked="task.completed"
                     @change="toggleTaskCompletion(task.id)"
                     class="w-5 h-5 mt-1" />

              <div class="flex-1">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-lg">
                    {{ task.title }}
                  </h3>
                  <span class="text-blue-600 font-bold">
                    {{ task.points }} PH
                  </span>
                </div>
                <p class="text-gray-600">
                  {{ task.description }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- COMPLETADAS -->
      <div v-if="completedTasks.length">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 class="w-6 h-6 text-green-500" />
          Completadas
        </h2>

        <div class="space-y-3">
          <div v-for="task in completedTasks"
               :key="task.id"
               class="p-4 bg-green-50 border border-green-200 rounded-xl">

            <div class="flex justify-between">
              <h3 class="line-through font-semibold">
                {{ task.title }}
              </h3>
              <span class="text-green-600 font-bold">
                +{{ task.points }} PH
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- REWARDS MODAL -->
    <div v-if="showRewards"
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative">

        <button
          @click="showRewards = false"
          class="absolute top-4 right-4 text-gray-500 hover:text-black">
          ✖
        </button>

        <h2 class="text-2xl font-bold mb-6">
          🎖 Sistema de Recompensas
        </h2>

        <div class="mb-6">
          <p class="text-lg font-semibold">
            {{ currentRank?.medal }} {{ currentRank?.name }}
          </p>

          <div v-if="nextRank" class="mt-4">
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-yellow-400 transition-all duration-500"
                :style="{ width: progressToNext + '%' }">
              </div>
            </div>
            <p class="text-xs mt-2">
              Próximo rango: {{ nextRank.name }} ({{ nextRank.min }} PH)
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="rank in ranks"
               :key="rank.name"
               class="p-4 rounded-xl border bg-gray-50">

            <h3 class="font-bold">
              {{ rank.medal }} {{ rank.name }}
            </h3>

            <ul class="text-sm text-gray-600 mt-2 space-y-1">
              <li v-for="perk in rank.perks"
                  :key="perk">
                ✔ {{ perk }}
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>