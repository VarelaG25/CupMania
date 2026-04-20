<script setup lang="ts">
import { ref, nextTick, watch, computed, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import {
  ArrowLeft,
  Send,
  Video,
  Phone,
  Plus,
  Smile,
  Search,
  UserPlus,
  MoreVertical,
  X,
  Users,
  Check,
} from "lucide-vue-next";
import VInput from "@/components/VInpput/VInput.vue";
import type { ChatMessage, Chat } from "./interfaces";
// --- CONFIGURACIÓN DE CONEXIÓN ---
const API_URL = "http://localhost:3000";
let socket: Socket;

// --- ESTADOS ---
const chatContainer = ref<HTMLElement | null>(null);
const selectedChat = ref<Chat | null>(null);
const messageInput = ref("");
const chats = ref<Chat[]>([]);
const messages = ref<ChatMessage[]>([]);
const searchMessage = ref("");
const searchContact = ref("");
const showGroupModal = ref(false);
const showCreateGroupModal = ref(false);

const newGroupName = ref("");
const selectedContacts = ref<string[]>([]);
const availableContacts = ref<any[]>([]);

// --- LÓGICA DE CARGA INICIAL CORREGIDA ---
onMounted(async () => {
  socket = io(API_URL);

  socket.on("receive_message", (newMessage: ChatMessage) => {
    if (selectedChat.value && newMessage.chatId === selectedChat.value.id) {
      messages.value.push(newMessage);
    }

    // Buscamos el chat en la lista
    const chatIndex = chats.value.findIndex((c) => c.id === newMessage.chatId);

    // CORRECCIÓN LÍNEAS 71-72: Validamos que el chat exista antes de editarlo
    if (chatIndex !== -1 && chats.value[chatIndex]) {
      chats.value[chatIndex].lastMessage = newMessage.content;
      chats.value[chatIndex].lastMessageTime = newMessage.timestamp;
    }
  });

  try {
    const resChats = await fetch(`${API_URL}/api/chats`);
    const dataChats = await resChats.json();
    chats.value = dataChats || []; // Aseguramos que siempre sea un array

    const resUsers = await fetch(`${API_URL}/api/users`);
    const dataUsers = await resUsers.json();
    availableContacts.value = dataUsers || [];
  } catch (error) {
    console.error("Error cargando datos iniciales:", error);
  }
});

onUnmounted(() => {
  if (socket) socket.disconnect();
});

// --- FUNCIONES CORE ---
const selectChat = async (chat: Chat) => {
  selectedChat.value = chat;
  socket.emit("join_chat", chat.id);

  try {
    const response = await fetch(`${API_URL}/api/messages/${chat.id}`);
    messages.value = await response.json();
    scrollToBottom();
  } catch (error) {
    console.error("Error cargando mensajes:", error);
  }
};

const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedChat.value) return;

  const payload = {
    chatId: selectedChat.value.id,
    senderId: "user1",
    senderName: "Tú",
    content: messageInput.value,
    type: "text",
  };

  socket.emit("send_message", payload);
  messageInput.value = "";
};

// --- FUNCIONES AUXILIARES (CORRECCIÓN DE ERRORES 2339) ---
const isUserOnline = (id: string) => {
  const onlineUsers = new Set(["user2", "user6", "user7"]);
  return onlineUsers.has(id);
};

const getChatOnlineStatus = (chat: Chat): boolean => {
  if (!chat || !chat.participants) return false;
  if (chat.type === "private") {
    const other = chat.participants.find((p) => p !== "user1");
    return other ? isUserOnline(other) : false;
  }
  return chat.participants.some((p) => p !== "user1" && isUserOnline(p));
};

const handleCall = (type: "audio" | "video") => {
  if (!selectedChat.value) return;
  alert(
    `Iniciando ${type === "video" ? "videollamada" : "llamada"} con ${selectedChat.value.name}...`,
  );
};

const getSenderName = (chat: Chat, msg: ChatMessage) => {
  if (msg.senderId === "user1") return "Tú";
  return msg.senderName || "Usuario";
};

const handleCreateGroup = async () => {
  if (!newGroupName.value || selectedContacts.value.length === 0) return;

  const newGroup = {
    id: `g${Date.now()}`,
    name: newGroupName.value,
    type: "group",
    avatar: "👥",
    participants: ["user1", ...selectedContacts.value],
  };

  try {
    const res = await fetch(`${API_URL}/api/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    });

    if (res.ok) {
      chats.value.unshift(newGroup as Chat);
      showCreateGroupModal.value = false;
      newGroupName.value = "";
      selectedContacts.value = [];
    }
  } catch (error) {
    console.error("Error al crear grupo:", error);
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const toggleContact = (id: string) => {
  const idx = selectedContacts.value.indexOf(id);
  if (idx > -1) selectedContacts.value.splice(idx, 1);
  else selectedContacts.value.push(id);
};

const filteredChats = computed(() => {
  const q = searchMessage.value.toLowerCase().trim();
  if (!q) return chats.value;
  return chats.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q),
  );
});

const filteredContacts = computed(() => {
  const q = searchContact.value.toLowerCase().trim();
  if (!q) return availableContacts.value;
  return availableContacts.value.filter((c) =>
    c.name.toLowerCase().includes(q),
  );
});

const formatTime = (date: string | Date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatDate = (date: string | Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

watch(messages, scrollToBottom, { deep: true });
</script>

<template>
  <div class="h-screen flex bg-slate-50 overflow-hidden relative">
    <div
      v-if="showCreateGroupModal"
      class="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div
          class="p-4 border-b flex justify-between items-center bg-slate-50 text-slate-800"
        >
          <h2 class="font-bold">Crear Nuevo Grupo</h2>
          <button @click="showCreateGroupModal = false">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4 space-y-4">
          <input
            v-model="newGroupName"
            type="text"
            placeholder="Nombre del grupo..."
            class="w-full bg-slate-100 border rounded-xl px-4 py-2 outline-none text-slate-800"
          />
          <VInput
            v-model="searchContact"
            placeholder="Buscar contactos..."
            :icon="Search"
          />
          <div class="max-h-52 overflow-y-auto space-y-1">
            <div
              v-for="contact in filteredContacts"
              :key="contact.id"
              @click="toggleContact(contact.id)"
              class="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-800"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold"
                >
                  {{ contact.avatar }}
                </div>
                <p class="text-sm font-medium">{{ contact.name }}</p>
              </div>
              <div
                class="w-5 h-5 rounded border-2 flex items-center justify-center"
                :class="
                  selectedContacts.includes(contact.id)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-slate-300'
                "
              >
                <Check
                  v-if="selectedContacts.includes(contact.id)"
                  class="w-3 h-3 text-white"
                />
              </div>
            </div>
          </div>
          <button
            @click="handleCreateGroup"
            :disabled="!newGroupName || selectedContacts.length === 0"
            class="w-full bg-blue-600 text-white py-2 rounded-xl font-bold disabled:bg-slate-300"
          >
            Crear Grupo
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showGroupModal"
      class="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div class="p-4 border-b flex justify-between items-center bg-slate-50">
          <h2 class="font-bold text-slate-800">
            Añadir miembros a {{ selectedChat?.name }}
          </h2>
          <button @click="showGroupModal = false">
            <X class="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div class="p-4 space-y-4">
          <VInput
            v-model="searchContact"
            placeholder="Buscar contactos..."
            :icon="Search"
          />
          <div class="max-h-60 overflow-y-auto space-y-2">
            <div
              v-for="contact in filteredContacts"
              :key="contact.id"
              class="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl border border-transparent text-slate-800"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs"
                >
                  {{ contact.avatar }}
                </div>
                <p class="text-sm font-medium">{{ contact.name }}</p>
              </div>
              <button
                class="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg font-bold"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside
      :class="[
        selectedChat ? 'hidden md:flex' : 'flex',
        'w-full md:w-80 flex-col bg-slate-900 text-white border-r border-slate-700',
      ]"
    >
      <div class="p-4 border-b border-slate-800">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-black text-blue-400">Mensajes</h1>
          <button
            @click="showCreateGroupModal = true"
            class="p-2 hover:bg-slate-800 rounded-lg text-blue-400 transition"
          >
            <Users class="w-5 h-5" />
          </button>
        </div>
        <VInput
          v-model="searchMessage"
          placeholder="Buscar chats..."
          :icon="Search"
        />
      </div>

      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        <button
          v-for="chat in filteredChats"
          :key="chat.id"
          @click="selectChat(chat as Chat)"
          class="w-full p-3 rounded-2xl text-left hover:bg-slate-800 transition-colors"
          :class="selectedChat?.id === chat.id ? 'bg-slate-800' : ''"
        >
          <div class="flex gap-3 items-center">
            <div class="relative">
              <div
                class="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold italic"
              >
                {{ chat.avatar }}
              </div>
              <span
                class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900"
                :class="
                  getChatOnlineStatus(chat as Chat)
                    ? 'bg-green-500'
                    : 'bg-slate-500'
                "
              />
            </div>
            <div class="flex-1 overflow-hidden">
              <div class="flex justify-between items-center">
                <p class="font-bold text-sm truncate">{{ chat.name }}</p>
                <span class="text-[10px] text-slate-400">{{
                  formatDate(chat.lastMessageTime)
                }}</span>
              </div>
              <p class="text-xs text-slate-400 truncate">
                {{ chat.lastMessage }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col bg-slate-100">
      <template v-if="selectedChat">
        <header
          class="h-16 bg-slate-900 flex items-center justify-between px-4 text-white shadow-md z-10"
        >
          <div class="flex items-center gap-3">
            <button class="md:hidden p-1" @click="selectedChat = null">
              <ArrowLeft />
            </button>
            <div
              class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold"
            >
              {{ selectedChat.avatar }}
            </div>
            <div>
              <p class="font-bold text-sm leading-tight">
                {{ selectedChat.name }}
              </p>
              <p class="text-[10px] text-blue-400 font-medium">
                {{
                  selectedChat.type === "group"
                    ? (selectedChat.participants?.length || 0) + " miembros"
                    : getChatOnlineStatus(selectedChat)
                      ? "En línea"
                      : "Desconectado"
                }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1 sm:gap-2">
            <button
              @click="handleCall('audio')"
              class="p-2 hover:bg-slate-800 rounded-full transition text-slate-300 hover:text-white"
              title="Llamada"
            >
              <Phone class="w-5 h-5" />
            </button>
            <button
              @click="handleCall('video')"
              class="p-2 hover:bg-slate-800 rounded-full transition text-slate-300 hover:text-white"
              title="Videollamada"
            >
              <Video class="w-5 h-5" />
            </button>
            <div class="w-px h-6 bg-slate-700 mx-1"></div>
            <button
              v-if="selectedChat.type === 'group'"
              @click="showGroupModal = true"
              class="p-2 hover:bg-slate-800 rounded-full transition text-blue-400 hover:text-blue-300"
              title="Añadir miembro"
            >
              <UserPlus class="w-5 h-5" />
            </button>
            <button
              class="p-2 hover:bg-slate-800 rounded-full transition text-slate-300"
            >
              <MoreVertical class="w-5 h-5" />
            </button>
          </div>
        </header>

        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-300"
        >
          <div
            v-for="m in messages"
            :key="m.id"
            class="flex flex-col"
            :class="m.senderId === 'user1' ? 'items-end' : 'items-start'"
          >
            <p
              v-if="selectedChat?.type === 'group' && m.senderId !== 'user1'"
              class="text-[10px] font-bold text-slate-500 mb-1 ml-2"
            >
              {{ getSenderName(selectedChat, m) }}
            </p>
            <div
              class="px-4 py-2 rounded-2xl max-w-[85%] sm:max-w-xs shadow-sm text-sm"
              :class="
                m.senderId === 'user1'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              "
            >
              {{ m.content }}
              <div class="text-[9px] mt-1 opacity-60 text-right font-medium">
                {{ formatTime(m.timestamp) }}
              </div>
            </div>
          </div>
        </div>

        <footer
          class="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
        >
          <button class="p-2 text-slate-400 hover:text-blue-600 transition">
            <Plus class="w-6 h-6" />
          </button>
          <div class="flex-1 relative flex items-center">
            <input
              v-model="messageInput"
              class="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Escribe un mensaje..."
              @keypress.enter.prevent="sendMessage"
            />
            <button
              class="absolute right-3 text-slate-400 hover:text-amber-500"
            >
              <Smile class="w-5 h-5" />
            </button>
          </div>
          <button
            @click="sendMessage"
            :disabled="!messageInput.trim()"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-200"
          >
            <Send class="w-5 h-5" />
          </button>
        </footer>
      </template>

      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-300"
      >
        <div
          class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4"
        >
          <Search class="w-10 h-10 text-slate-300" />
        </div>
        <p class="font-medium italic">
          Selecciona una conversación para empezar
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
