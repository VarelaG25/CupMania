<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    MapPin,
    Users,
    Calendar,
    Trophy,
    Search,

} from 'lucide-vue-next'


/* 🏆 Ranking Global */

const rankingUsers = ref([
    { id: 1, name: 'Carlos MX', ph: 4200 },
    { id: 2, name: 'Ana Brasil', ph: 3100 },
    { id: 3, name: 'Luis Pro', ph: 2800 },
    { id: 4, name: 'Sofía Fan', ph: 1700 },
    { id: 5, name: 'Miguel 10', ph: 1200 },
    { id: 6, name: 'Valeria', ph: 900 },
    { id: 7, name: 'Diego', ph: 650 },
    { id: 8, name: 'Camila', ph: 400 },
    { id: 9, name: 'Fernando', ph: 250 },
    { id: 10, name: 'Andrea', ph: 120 }
])

const sortedRanking = computed(() =>
    [...rankingUsers.value].sort((a, b) => b.ph - a.ph)
)

const getRankData = (ph: number) => {
    if (ph >= 3000)
        return { name: 'Leyenda', color: 'text-yellow-500', medal: '🥇', vip: true }

    if (ph >= 1501)
        return { name: 'Hincha Pro', color: 'text-green-500', medal: '🥈', vip: false }

    if (ph >= 501)
        return { name: 'Fan', color: 'text-amber-600', medal: '🥉', vip: false }

    return { name: 'Turista', color: 'text-gray-600', medal: null, vip: false }
}

/* 🔥 Mock Data */
const stadiums = ref([
    {
        id: 1,
        name: 'Estadio Azteca',
        city: 'Ciudad de México',
        country: 'México',
        capacity: 87000,
        matches: 5,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7fbe'
    },
    {
        id: 2,
        name: 'MetLife Stadium',
        city: 'New York',
        country: 'USA',
        capacity: 82500,
        matches: 8,
        image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460'
    },
    {
        id: 3,
        name: 'SoFi Stadium',
        city: 'Los Ángeles',
        country: 'USA',
        capacity: 70240,
        matches: 6,
        image: 'https://images.unsplash.com/photo-1606925797303-9d2f5b2c8e65'
    },
    {
        id: 4,
        name: 'AT&T Stadium',
        city: 'Dallas',
        country: 'USA',
        capacity: 80000,
        matches: 7,
        image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308'
    },
    {
        id: 5,
        name: 'NRG Stadium',
        city: 'Houston',
        country: 'USA',
        capacity: 72220,
        matches: 4,
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e'
    },
    {
        id: 6,
        name: 'Estadio BBVA',
        city: 'Monterrey',
        country: 'México',
        capacity: 53500,
        matches: 5,
        image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659'
    },
    {
        id: 7,
        name: 'BC Place',
        city: 'Vancouver',
        country: 'Canadá',
        capacity: 54500,
        matches: 3,
        image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455'
    },
    {
        id: 8,
        name: 'Mercedes-Benz Stadium',
        city: 'Atlanta',
        country: 'USA',
        capacity: 71000,
        matches: 6,
        image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d'
    }
])

const teams = ref([
    // Grupo A
    { id: 1, name: 'México', group: 'A', played: 2, points: 4, flag: '🇲🇽' },
    { id: 2, name: 'Brasil', group: 'A', played: 2, points: 6, flag: '🇧🇷' },
    { id: 3, name: 'Japón', group: 'A', played: 2, points: 1, flag: '🇯🇵' },
    { id: 4, name: 'Nigeria', group: 'A', played: 2, points: 0, flag: '🇳🇬' },

    // Grupo B
    { id: 5, name: 'Francia', group: 'B', played: 2, points: 6, flag: '🇫🇷' },
    { id: 6, name: 'Alemania', group: 'B', played: 2, points: 3, flag: '🇩🇪' },
    { id: 7, name: 'Chile', group: 'B', played: 2, points: 3, flag: '🇨🇱' },
    { id: 8, name: 'Canadá', group: 'B', played: 2, points: 0, flag: '🇨🇦' },

    // Grupo C
    { id: 9, name: 'Argentina', group: 'C', played: 2, points: 6, flag: '🇦🇷' },
    { id: 10, name: 'USA', group: 'C', played: 2, points: 3, flag: '🇺🇸' },
    { id: 11, name: 'Corea', group: 'C', played: 2, points: 1, flag: '🇰🇷' },
    { id: 12, name: 'Egipto', group: 'C', played: 2, points: 0, flag: '🇪🇬' },

    // Grupo D
    { id: 13, name: 'España', group: 'D', played: 2, points: 4, flag: '🇪🇸' },
    { id: 14, name: 'Inglaterra', group: 'D', played: 2, points: 4, flag: '🏴' },
    { id: 15, name: 'Suiza', group: 'D', played: 2, points: 1, flag: '🇨🇭' },
    { id: 16, name: 'Marruecos', group: 'D', played: 2, points: 0, flag: '🇲🇦' },

    // Grupo E
    { id: 17, name: 'Portugal', group: 'E', played: 2, points: 6, flag: '🇵🇹' },
    { id: 18, name: 'Uruguay', group: 'E', played: 2, points: 3, flag: '🇺🇾' },
    { id: 19, name: 'Polonia', group: 'E', played: 2, points: 1, flag: '🇵🇱' },
    { id: 20, name: 'Irán', group: 'E', played: 2, points: 0, flag: '🇮🇷' },

    // Grupo F
    { id: 21, name: 'Croacia', group: 'F', played: 2, points: 4, flag: '🇭🇷' },
    { id: 22, name: 'Bélgica', group: 'F', played: 2, points: 3, flag: '🇧🇪' },
    { id: 23, name: 'Dinamarca', group: 'F', played: 2, points: 2, flag: '🇩🇰' },
    { id: 24, name: 'Ghana', group: 'F', played: 2, points: 0, flag: '🇬🇭' },

    // Grupo G
    { id: 25, name: 'Italia', group: 'G', played: 2, points: 6, flag: '🇮🇹' },
    { id: 26, name: 'Países Bajos', group: 'G', played: 2, points: 4, flag: '🇳🇱' },
    { id: 27, name: 'Serbia', group: 'G', played: 2, points: 1, flag: '🇷🇸' },
    { id: 28, name: 'Australia', group: 'G', played: 2, points: 0, flag: '🇦🇺' },

    // Grupo H
    { id: 29, name: 'Colombia', group: 'H', played: 2, points: 6, flag: '🇨🇴' },
    { id: 30, name: 'Suecia', group: 'H', played: 2, points: 3, flag: '🇸🇪' },
    { id: 31, name: 'Turquía', group: 'H', played: 2, points: 1, flag: '🇹🇷' },
    { id: 32, name: 'Camerún', group: 'H', played: 2, points: 0, flag: '🇨🇲' }
])

const searchQuery = ref('')

/* 🔎 Filtrado */
const filteredStadiums = computed(() =>
    stadiums.value.filter(stadium =>
        stadium.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        stadium.city.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

/* 📊 Agrupar equipos */
const groupedTeams = computed(() => {
    const groups: Record<string, any[]> = {}

    teams.value.forEach(team => {
        if (!groups[team.group]) {
            groups[team.group] = []
        }
        groups[team.group]!.push(team)
    })

    return groups
})
</script>

<template>
    <div class="min-h-screen bg-white">

        <!-- Contenido -->
        <div class="container mx-auto px-4 py-6 max-w-7xl">

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div class="p-4 rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-lg">
                    <div class="flex items-center gap-3">
                        <MapPin class="w-6 h-6" />
                        <div>
                            <p class="text-xs">Estadios</p>
                            <p class="text-2xl font-bold">{{ stadiums.length }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                    <div class="flex items-center gap-3">
                        <Users class="w-6 h-6" />
                        <div>
                            <p class="text-xs">Equipos</p>
                            <p class="text-2xl font-bold">{{ teams.length }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg">
                    <div class="flex items-center gap-3">
                        <Calendar class="w-6 h-6" />
                        <div>
                            <p class="text-xs">Partidos</p>
                            <p class="text-2xl font-bold">104</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg">
                    <div class="flex items-center gap-3">
                        <Trophy class="w-6 h-6" />
                        <div>
                            <p class="text-xs">Ciudades</p>
                            <p class="text-2xl font-bold">16</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Partido Destacado -->
            <div class="mb-6 overflow-hidden rounded-2xl shadow-lg">
                <div class="relative h-56 bg-gradient-to-r from-blue-700 via-purple-600 to-green-500">
                    <img src="https://images.unsplash.com/photo-1616510109926-d83f057f168c"
                        class="w-full h-full object-cover opacity-30" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div class="absolute bottom-4 left-4 right-4 text-white">
                        <span
                            class="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 shadow">
                            🔴 En Vivo Ahora
                        </span>

                        <h3 class="text-2xl md:text-3xl font-bold mb-1">
                            México 🇲🇽 vs Brasil 🇧🇷
                        </h3>

                        <p class="text-white/90 text-sm md:text-base">
                            Estadio Azteca • 15:00 hrs
                        </p>
                    </div>
                </div>
            </div>

            <!-- Búsqueda -->
            <div class="mb-6 relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input v-model="searchQuery" type="text" placeholder="Buscar estadios o ciudades..."
                    class="pl-10 h-12 w-full border rounded-xl px-4 focus:ring-2 focus:ring-blue-500" />
            </div>


            <!-- GRID PRINCIPAL -->
            <div class="grid md:grid-cols-2 gap-6 items-stretch">

                <!-- Estadios -->
                <div class="flex flex-col h-[650px]">
                    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin class="w-6 h-6 text-blue-700" />
                        Estadios
                    </h2>

                    <div class="space-y-3 overflow-y-auto pr-2 flex-1">
                        <div v-for="stadium in filteredStadiums" :key="stadium.id"
                            class="flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">

                            <img :src="stadium.image" class="w-24 h-24 rounded-lg object-cover" />

                            <div class="flex-1">
                                <h3 class="font-bold text-lg">{{ stadium.name }}</h3>
                                <p class="text-sm text-gray-600">
                                    {{ stadium.city }}, {{ stadium.country }}
                                </p>
                                <p class="text-sm text-gray-500 mt-1">
                                    Capacidad: {{ stadium.capacity.toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabla de Grupos -->
                <div class="flex flex-col h-[650px]">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold flex items-center gap-2">
                            <Trophy class="w-6 h-6 text-green-500" />
                            Tabla de Grupos
                        </h2>
                    </div>

                    <div class="space-y-4 overflow-y-auto pr-2 flex-1">
                        <div v-for="(groupTeams, group) in groupedTeams" :key="group"
                            class="bg-white shadow-md rounded-2xl p-4">

                            <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                                <span
                                    class="bg-gradient-to-r from-blue-700 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow">
                                    {{ group }}
                                </span>
                                Grupo {{ group }}
                            </h3>

                            <div class="overflow-x-auto">
                                <table class="w-full text-sm">
                                    <thead>
                                        <tr class="border-b">
                                            <th class="text-left py-2 font-semibold">Equipo</th>
                                            <th class="text-center py-2 font-semibold w-12">PJ</th>
                                            <th class="text-center py-2 font-semibold w-12">Pts</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(team, index) in [...groupTeams].sort((a, b) => b.points - a.points)"
                                            :key="team.id" :class="[
                                                'border-b last:border-b-0 transition',
                                                index < 2 ? 'bg-green-50' : ''
                                            ]">

                                            <td class="py-2 flex items-center gap-2">
                                                <span class="text-2xl">{{ team.flag }}</span>
                                                <span class="font-medium">{{ team.name }}</span>
                                            </td>

                                            <td class="text-center py-2 text-gray-600">
                                                {{ team.played }}
                                            </td>

                                            <td class="text-center py-2 font-bold">
                                                {{ team.points }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <!-- 🏆 Ranking Global -->
            <div class="mt-12">

                <h2 class="text-3xl font-bold mb-6 flex items-center gap-2">
                    <Trophy class="w-7 h-7 text-yellow-500" />
                    Ranking Global de Hinchas
                </h2>

                <div class="bg-white shadow-xl rounded-2xl overflow-hidden">

                    <div v-for="(user, index) in sortedRanking" :key="user.id"
                        class="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition">

                        <!-- Posición -->
                        <div class="flex items-center gap-4">

                            <div class="w-10 h-10 flex items-center justify-center rounded-full font-bold text-white"
                                :class="[
                                    index === 0 ? 'bg-yellow-500' :
                                        index === 1 ? 'bg-gray-400' :
                                            index === 2 ? 'bg-amber-600' :
                                                'bg-gray-300 text-gray-700'
                                ]">
                                {{ index + 1 }}
                            </div>

                            <!-- Nombre + rango -->
                            <div>
                                <div class="font-bold text-lg flex items-center gap-2"
                                    :class="getRankData(user.ph).color">

                                    <span>{{ getRankData(user.ph).medal }}</span>
                                    {{ user.name }}

                                </div>

                                <div class="text-xs text-gray-500 flex items-center gap-2">
                                    {{ getRankData(user.ph).name }}

                                    <span v-if="getRankData(user.ph).vip"
                                        class="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                                        FIFA VIP 👑
                                    </span>
                                </div>
                            </div>

                        </div>

                        <!-- PH -->
                        <div class="text-right">
                            <div class="text-lg font-bold text-purple-600">
                                {{ user.ph.toLocaleString() }} PH
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <!-- SECCIÓN EXTRA FINAL -->
            <div class="mt-10 bg-gradient-to-r from-blue-700 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div class="grid md:grid-cols-2 gap-6 items-center">

                    <div>
                        <h2 class="text-3xl font-bold mb-3">
                            Próximamente
                        </h2>

                        <p class="text-white/90 mb-4">
                            Información sobre eliminatorias, calendario completo,
                            estadísticas avanzadas y predicciones del torneo.
                        </p>

                        <button
                            class="bg-white text-blue-700 font-semibold px-6 py-2 rounded-xl shadow hover:scale-105 transition">
                            Ver más
                        </button>
                    </div>

                    <div class="text-center text-6xl opacity-20">
                        🏆
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>