import { createRouter, createWebHistory } from "vue-router";

// Importa tus vistas
import HomeView from "@/views/Home/HomeView.vue";
import TaskGroupView from "@/views/TaskGroup/TaskGroupView.vue";
import ProfileView from "@/views/Profile/ProfileView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import ChatsView from "@/views/Chats/ChatsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chats",
    name: "chats",
    component: ChatsView,
  },
  {
    path: "/task-group",
    name: "task-group",
    component: TaskGroupView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
