import { defineStore } from "pinia";
import { ref, computed } from "vue";

type User = {
  id: string;
  name: string;
  avatar: string;
  fanPoints: number;
};

type Rank = {
  name: string;
  min: number;
  max: number | null;
  color: string;
  medal: string | null;
  special?: string;
};

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

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

  // 🔥 load inicial (sessionStorage)
  const loadUser = () => {
    const saved = sessionStorage.getItem("user");
    user.value = saved ? JSON.parse(saved) : null;
  };

  // 🔥 login / overwrite (REACTIVO SIEMPRE)
  const setUser = (newUser: User) => {
    user.value = newUser;
    sessionStorage.setItem("user", JSON.stringify(newUser));
  };

  // 🔥 logout
  const logout = () => {
    user.value = null;
    sessionStorage.removeItem("user");
  };

  // 🔥 computed rank
  const currentRank = computed(() => {
    if (!user.value) {
      return ranks.find((r) => r.name === "Turista")!;
    }

    const points = user.value.fanPoints ?? 0;

    return (
      ranks.find(
        (r) => points >= r.min && (r.max === null || points <= r.max),
      ) ?? ranks.find((r) => r.name === "Turista")!
    );
  });

  // 🔥 update parcial (clave para re-login sin reset)
  const patchUser = (partial: Partial<User>) => {
    if (!user.value) return;

    user.value = {
      ...user.value,
      ...partial,
    };

    sessionStorage.setItem("user", JSON.stringify(user.value));
  };

  return {
    user,
    ranks,
    currentRank,
    loadUser,
    setUser,
    patchUser,
    logout,
  };
});
