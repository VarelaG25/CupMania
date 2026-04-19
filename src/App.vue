<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/VNavBar/VNavBar.vue";
import VFooter from "./components/VNavBar/VFooter.vue";

const route = useRoute();

const isAuthPage = computed(() => {
  return route.path === "/login" || route.path === "/register";
});
</script>

<template>
  <!-- Si NO es login/register -->
  <div v-if="!isAuthPage">
    <Navbar />
    <main>
      <router-view />
    </main>
    <VFooter />
  </div>

  <!-- Si ES login/register -->
  <div v-else>
    <router-view />
  </div>
</template>
