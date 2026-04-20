<script setup lang="ts">
import { ref, computed } from "vue";
import { MapPin, Users, Calendar, Trophy, Search } from "lucide-vue-next";
import VInput from "@/components/VInpput/VInput.vue";

/* 🏆 Ranking Global */

const rankingUsers = ref([
  { id: 1, name: "Carlos MX", ph: 4200 },
  { id: 2, name: "Ana Brasil", ph: 3100 },
  { id: 3, name: "Luis Pro", ph: 2800 },
  { id: 4, name: "Sofía Fan", ph: 1700 },
  { id: 5, name: "Miguel 10", ph: 1200 },
  { id: 6, name: "Valeria", ph: 900 },
  { id: 7, name: "Diego", ph: 650 },
  { id: 8, name: "Camila", ph: 400 },
  { id: 9, name: "Fernando", ph: 250 },
  { id: 10, name: "Andrea", ph: 120 },
]);

const sortedRanking = computed(() =>
  [...rankingUsers.value].sort((a, b) => b.ph - a.ph),
);

const getRankData = (ph: number) => {
  if (ph >= 3000)
    return {
      name: "Leyenda",
      color: "text-yellow-500",
      medal: "🥇",
      vip: true,
    };

  if (ph >= 1501)
    return {
      name: "Hincha Pro",
      color: "text-green-500",
      medal: "🥈",
      vip: false,
    };

  if (ph >= 501)
    return { name: "Fan", color: "text-amber-600", medal: "🥉", vip: false };

  return { name: "Turista", color: "text-gray-600", medal: null, vip: false };
};

/* 🔥 Mock Data */
const stadiums = ref([
  {
    id: 1,
    name: "Estadio Azteca",
    city: "Ciudad de México",
    country: "México",
    capacity: 87000,
    matches: 5,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7fbe",
  },
  {
    id: 2,
    name: "MetLife Stadium",
    city: "New York",
    country: "USA",
    capacity: 82500,
    matches: 8,
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
  },
  {
    id: 3,
    name: "SoFi Stadium",
    city: "Los Ángeles",
    country: "USA",
    capacity: 70240,
    matches: 6,
    image: "https://images.unsplash.com/photo-1606925797303-9d2f5b2c8e65",
  },
  {
    id: 4,
    name: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    capacity: 80000,
    matches: 7,
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308",
  },
  {
    id: 5,
    name: "NRG Stadium",
    city: "Houston",
    country: "USA",
    capacity: 72220,
    matches: 4,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
  },
  {
    id: 6,
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "México",
    capacity: 53500,
    matches: 5,
    image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659",
  },
  {
    id: 7,
    name: "BC Place",
    city: "Vancouver",
    country: "Canadá",
    capacity: 54500,
    matches: 3,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
  },
  {
    id: 8,
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "USA",
    capacity: 71000,
    matches: 6,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d",
  },
]);

const teams = ref([
  // Grupo A
  { id: 1, name: "México", group: "A", played: 2, points: 4, flag: "🇲🇽" },
  { id: 2, name: "Brasil", group: "A", played: 2, points: 6, flag: "🇧🇷" },
  { id: 3, name: "Japón", group: "A", played: 2, points: 1, flag: "🇯🇵" },
  { id: 4, name: "Nigeria", group: "A", played: 2, points: 0, flag: "🇳🇬" },

  // Grupo B
  { id: 5, name: "Francia", group: "B", played: 2, points: 6, flag: "🇫🇷" },
  { id: 6, name: "Alemania", group: "B", played: 2, points: 3, flag: "🇩🇪" },
  { id: 7, name: "Chile", group: "B", played: 2, points: 3, flag: "🇨🇱" },
  { id: 8, name: "Canadá", group: "B", played: 2, points: 0, flag: "🇨🇦" },

  // Grupo C
  { id: 9, name: "Argentina", group: "C", played: 2, points: 6, flag: "🇦🇷" },
  { id: 10, name: "USA", group: "C", played: 2, points: 3, flag: "🇺🇸" },
  { id: 11, name: "Corea", group: "C", played: 2, points: 1, flag: "🇰🇷" },
  { id: 12, name: "Egipto", group: "C", played: 2, points: 0, flag: "🇪🇬" },

  // Grupo D
  { id: 13, name: "España", group: "D", played: 2, points: 4, flag: "🇪🇸" },
  { id: 14, name: "Inglaterra", group: "D", played: 2, points: 4, flag: "🏴" },
  { id: 15, name: "Suiza", group: "D", played: 2, points: 1, flag: "🇨🇭" },
  { id: 16, name: "Marruecos", group: "D", played: 2, points: 0, flag: "🇲🇦" },

  // Grupo E
  { id: 17, name: "Portugal", group: "E", played: 2, points: 6, flag: "🇵🇹" },
  { id: 18, name: "Uruguay", group: "E", played: 2, points: 3, flag: "🇺🇾" },
  { id: 19, name: "Polonia", group: "E", played: 2, points: 1, flag: "🇵🇱" },
  { id: 20, name: "Irán", group: "E", played: 2, points: 0, flag: "🇮🇷" },

  // Grupo F
  { id: 21, name: "Croacia", group: "F", played: 2, points: 4, flag: "🇭🇷" },
  { id: 22, name: "Bélgica", group: "F", played: 2, points: 3, flag: "🇧🇪" },
  { id: 23, name: "Dinamarca", group: "F", played: 2, points: 2, flag: "🇩🇰" },
  { id: 24, name: "Ghana", group: "F", played: 2, points: 0, flag: "🇬🇭" },

  // Grupo G
  { id: 25, name: "Italia", group: "G", played: 2, points: 6, flag: "🇮🇹" },
  {
    id: 26,
    name: "Países Bajos",
    group: "G",
    played: 2,
    points: 4,
    flag: "🇳🇱",
  },
  { id: 27, name: "Serbia", group: "G", played: 2, points: 1, flag: "🇷🇸" },
  { id: 28, name: "Australia", group: "G", played: 2, points: 0, flag: "🇦🇺" },

  // Grupo H
  { id: 29, name: "Colombia", group: "H", played: 2, points: 6, flag: "🇨🇴" },
  { id: 30, name: "Suecia", group: "H", played: 2, points: 3, flag: "🇸🇪" },
  { id: 31, name: "Turquía", group: "H", played: 2, points: 1, flag: "🇹🇷" },
  { id: 32, name: "Camerún", group: "H", played: 2, points: 0, flag: "🇨🇲" },
]);

const source = ref([
  { id: 1, name: "Estadios", value: stadiums.value.length },
  { id: 2, name: "Equipos", value: teams.value.length },
  { id: 3, name: "Partidos", value: 104 },
  { id: 4, name: "Ciudades", value: 16 },
]);

const searchQuery = ref("");

/* 🔎 Filtrado */
const filteredStadiums = computed(() =>
  stadiums.value.filter(
    (stadium) =>
      stadium.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      stadium.city.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

/* 📊 Agrupar equipos */
const groupedTeams = computed(() => {
  const groups: Record<string, any[]> = {};

  teams.value.forEach((team) => {
    if (!groups[team.group]) {
      groups[team.group] = [];
    }
    groups[team.group]!.push(team);
  });

  return groups;
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-6 md:py-8 px-4 md:px-6">
      <!-- 📊 STATS -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <section
          v-for="value in source"
          :key="value.name"
          class="p-4 rounded-xl text-white shadow-sm"
          :class="
            value.name === 'Estadios'
              ? 'bg-blue-700'
              : value.name === 'Equipos'
                ? 'bg-green-600'
                : value.name === 'Partidos'
                  ? 'bg-red-600'
                  : 'bg-purple-600'
          "
        >
          <div class="flex items-center gap-3">
            <component
              :is="
                value.name === 'Estadios'
                  ? MapPin
                  : value.name === 'Equipos'
                    ? Users
                    : value.name === 'Partidos'
                      ? Calendar
                      : Trophy
              "
              class="w-7 h-7 md:w-8 md:h-8 opacity-80"
            />

            <div>
              <p class="text-xs">{{ value.name }}</p>
              <p class="text-xl md:text-2xl font-bold">
                {{ value.value }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- ⚽ MATCH HERO -->
      <div class="mb-6 overflow-hidden rounded-2xl shadow-sm">
        <div
          class="relative h-44 md:h-56 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500"
        >
          <img
            src="https://images.unsplash.com/photo-1616510109926-d83f057f168c"
            class="w-full h-full object-cover opacity-30"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          ></div>

          <div
            class="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-white"
          >
            <span
              class="inline-block bg-red-600 text-white text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full mb-2"
            >
              🔴 En Vivo Ahora
            </span>

            <h3 class="text-xl md:text-3xl font-bold">
              México 🇲🇽 vs Brasil 🇧🇷
            </h3>

            <p class="text-white/90 text-xs md:text-base">
              Estadio Azteca • 15:00 hrs
            </p>
          </div>
        </div>
      </div>

      <!-- SEARCH + CONTENT -->
      <main class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section
            class="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white overflow-hidden flex flex-col h-[750px] transition-all hover:shadow-2xl"
          >
            <header class="px-6 py-5 border-b border-gray-100/50 bg-white/60">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200"
                  >
                    <MapPin class="w-6 h-6 text-white" />
                  </div>
                  <h2
                    class="text-xl font-black text-gray-800 tracking-tight uppercase italic"
                  >
                    Estadios
                  </h2>
                </div>
                <span
                  class="text-[10px] font-black px-3 py-1 bg-blue-100 text-blue-700 rounded-full tracking-widest uppercase"
                >
                  {{ filteredStadiums.length }} Sedes
                </span>
              </div>

              <div class="relative">
                <VInput
                  v-model="searchQuery"
                  placeholder="Buscar estadios o ciudades..."
                  :icon="Search"
                  class="w-full shadow-inner bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </header>

            <div
              class="overflow-y-auto flex-1 divide-y divide-gray-100/50 custom-scrollbar"
            >
              <article
                v-for="stadium in filteredStadiums"
                :key="stadium.id"
                class="group flex items-center gap-5 m-3 p-2 rounded-lg bg-gray-300 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
              >
                <figure class="relative flex-shrink-0">
                  <img
                    :src="stadium.image"
                    :alt="stadium.name"
                    class="w-20 h-20 rounded-2xl object-cover shadow-md ring-4 ring-white group-hover:ring-blue-100 transition-all"
                  />
                </figure>

                <div class="flex-1 min-w-0">
                  <h3
                    class="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors"
                  >
                    {{ stadium.name }}
                  </h3>
                  <div
                    class="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3 uppercase tracking-tighter"
                  >
                    <span class="text-blue-600">{{ stadium.country }}</span>
                    <span class="text-gray-300">•</span>
                    <span>{{ stadium.city }}</span>
                  </div>

                  <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <span
                      class="text-[9px] uppercase tracking-widest text-gray-400 font-black"
                      >Capacidad</span
                    >
                    <span class="text-sm font-black text-blue-700">
                      {{ stadium.capacity.toLocaleString() }}
                    </span>
                  </div>
                </div>

                <div
                  class="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                >
                  <div
                    class="p-2 bg-blue-600 rounded-full shadow-lg shadow-blue-100"
                  >
                    <ChevronRight class="w-4 h-4 text-white" />
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            class="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white overflow-hidden flex flex-col h-[750px] transition-all hover:shadow-2xl"
          >
            <header
              class="px-6 py-5 border-b border-gray-100/50 bg-white/60 flex items-center gap-3"
            >
              <div
                class="p-2.5 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200"
              >
                <Trophy class="w-6 h-6 text-white" />
              </div>
              <h2
                class="text-xl font-black text-gray-800 tracking-tight uppercase italic"
              >
                Posiciones
              </h2>
            </header>

            <div class="p-6 space-y-10 overflow-y-auto flex-1 custom-scrollbar">
              <div
                v-for="(groupTeams, group) in groupedTeams"
                :key="group"
                class="relative"
              >
                <div class="flex items-center gap-4 mb-5">
                  <span
                    class="bg-gray-900 text-white w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-black shadow-xl ring-4 ring-white"
                  >
                    {{ group }}
                  </span>
                  <div
                    class="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"
                  ></div>
                </div>

                <div
                  class="bg-gray-300 rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr
                        class="bg-gray-50/50 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black"
                      >
                        <th class="py-4 px-5">Equipo</th>
                        <th class="py-4 text-center w-12">PJ</th>
                        <th class="py-4 text-center w-16 text-blue-600">Pts</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      <tr
                        v-for="(team, index) in [...groupTeams].sort(
                          (a, b) => b.points - a.points,
                        )"
                        :key="team.id"
                        class="group hover:bg-blue-50/20 transition-colors"
                      >
                        <td class="px-5 py-4 flex items-center gap-4">
                          <span
                            :class="
                              index < 2 ? 'text-blue-600' : 'text-gray-400'
                            "
                            class="text-xs font-black italic w-4"
                          >
                            {{ (index + 1).toString().padStart(2, "0") }}
                          </span>
                          <span
                            class="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                          >
                            {{ team.flag }}
                          </span>
                          <span
                            :class="
                              index < 2
                                ? 'font-black text-gray-900'
                                : 'font-bold text-gray-600'
                            "
                            class="text-sm tracking-tight"
                          >
                            {{ team.name }}
                          </span>
                        </td>
                        <td
                          class="text-center text-xs font-black text-gray-400"
                        >
                          {{ team.played }}
                        </td>
                        <td class="text-center px-4">
                          <span
                            :class="
                              index < 2
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                : 'bg-gray-100 text-gray-700'
                            "
                            class="inline-block w-10 py-2 rounded-xl text-xs font-black"
                          >
                            {{ team.points }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- 🏆 RANKING -->
      <div
        class="mt-10 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6"
        >
          <h2
            class="text-xl md:text-3xl font-bold flex items-center gap-3 text-slate-800"
          >
            <div class="p-2 rounded-lg bg-yellow-100">
              <Trophy class="w-6 h-6 text-yellow-600" />
            </div>
            Ranking Global de Hinchas
          </h2>

          <span class="text-xs text-slate-500">
            Actualizado en tiempo real
          </span>
        </div>

        <div>
          <div
            v-for="(user, index) in sortedRanking"
            :key="user.id"
            class="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 hover:bg-slate-50 transition"
          >
            <!-- LEFT -->
            <div class="flex items-center gap-3 md:gap-5">
              <div
                class="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl font-bold text-white"
                :class="[
                  index === 0
                    ? 'bg-yellow-500'
                    : index === 1
                      ? 'bg-slate-400'
                      : index === 2
                        ? 'bg-amber-500'
                        : 'bg-gray-400',
                ]"
              >
                {{ index + 1 }}
              </div>

              <div>
                <div
                  class="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2"
                >
                  <span>{{ getRankData(user.ph).medal }}</span>
                  {{ user.name }}
                </div>

                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-slate-500">
                    {{ getRankData(user.ph).name }}
                  </span>

                  <span
                    v-if="getRankData(user.ph).vip"
                    class="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold"
                  >
                    VIP 👑
                  </span>
                </div>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="text-right">
              <div class="text-base md:text-lg font-bold text-purple-600">
                {{ user.ph.toLocaleString() }}
              </div>
              <div class="text-[10px] text-slate-400">Fan Points</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN EXTRA FINAL -->
      <div
        class="mt-10 bg-gradient-to-r from-blue-700 to-purple-600 rounded-2xl p-8 text-white shadow-sm"
      >
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-3">Próximamente</h2>
            <p class="text-white/90 mb-4">
              Información sobre eliminatorias, calendario completo, estadísticas
              avanzadas y predicciones del torneo.
            </p>
            <button
              class="bg-white text-blue-700 font-semibold px-6 py-2 rounded-xl hover:scale-105 transition"
            >
              Ver más
            </button>
          </div>
          <div class="text-center text-6xl opacity-50">🏆</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
