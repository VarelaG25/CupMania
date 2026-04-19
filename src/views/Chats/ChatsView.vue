<script setup lang="ts">
import { ref, nextTick, watch, computed } from "vue";
import { ArrowLeft, Send, Video, Phone, Plus, Smile } from "lucide-vue-next";

// Importación de datos y componentes
import { chats, chatMessages } from "./mockData";
import VInput from "@/components/VInpput/VInput.vue";
import { Search } from "lucide-vue-next";

// --- INTERFACES DE TYPESCRIPT ---
interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: "private" | "group";
  participants: string[];
  lastMessage?: string;
  lastMessageTime: string | Date;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date | string;
  type: string;
}

// --- ESTADO REACTIVO ---
const chatContainer = ref<HTMLElement | null>(null);
const selectedChat = ref<Chat | null>(null);
const messageInput = ref("");
const messages = ref<ChatMessage[]>([]);
const searchMessage = ref("");

const onlineUsers = new Set(["user2", "user6", "user7"]);

// --- LÓGICA DE ESTADO Y USUARIOS ---
const isUserOnline = (id: string): boolean => onlineUsers.has(id);

const getChatOnlineStatus = (chat: Chat): boolean => {
  if (chat.type === "private") {
    const other = chat.participants.find((p: string) => p !== "user1");
    return other ? isUserOnline(other) : false;
  }
  return chat.participants.some(
    (p: string) => p !== "user1" && isUserOnline(p),
  );
};

// --- NAVEGACIÓN Y SCROLL ---
const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }
};

const selectChat = (chat: Chat) => {
  selectedChat.value = chat;
  // Casting para asegurar que los mensajes coincidan con la interfaz
  messages.value = [...((chatMessages as any)[chat.id] || [])];
  scrollToBottom();
};

// --- ACCIONES DE CHAT ---
const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedChat.value) return;

  const newMessage: ChatMessage = {
    id: `m${Date.now()}`,
    senderId: "user1",
    content: messageInput.value,
    timestamp: new Date(),
    type: "text",
  };

  messages.value.push(newMessage);
  messageInput.value = "";
  // El watcher se encarga del scrollToBottom
};

const filteredChats = computed(() => {
  if (!searchMessage.value.trim()) return chats;

  const query = searchMessage.value.toLowerCase();

  return chats.filter((chat) => {
    return (
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage.toLowerCase().includes(query)
    );
  });
});

// --- FORMATEADORES ---
const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("es-ES");
};

// --- WATCHERS ---
watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true },
);
</script>

<template>
  <div class="h-screen flex bg-slate-50 overflow-hidden">
    <aside
      :class="[
        selectedChat ? 'hidden md:flex' : 'flex',
        'w-full md:w-80 flex-col bg-slate-900 text-white border-r border-slate-800',
      ]"
    >
      <div class="p-4 border-b border-slate-800">
        <h1
          class="text-xl font-black italic uppercase tracking-tighter mb-4 text-blue-400"
        >
          Mensajes
        </h1>
        <div class="relative">
          <VInput
            v-model="searchMessage"
            placeholder="Buscar chats..."
            :icon="Search"
            class="w-full shadow-inner bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <div class="absolute left-3 top-2.5 text-slate-500"></div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        <transition-group name="list" tag="div">
          <button
            v-for="chat in filteredChats"
            :key="chat.id"
            @click="selectChat(chat)"
            class="w-full p-3 rounded-2xl text-left transition-all duration-200 hover:bg-slate-800/50 group"
            :class="
              selectedChat?.id === chat.id ? 'bg-slate-800 shadow-lg' : ''
            "
          >
            <div class="flex gap-3 items-center">
              <div class="relative flex-shrink-0">
                <div
                  class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-black italic shadow-lg"
                >
                  {{ chat.avatar }}
                </div>
                <span
                  class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-slate-900"
                  :class="
                    getChatOnlineStatus(chat) ? 'bg-green-500' : 'bg-slate-500'
                  "
                />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline">
                  <h3 class="font-bold truncate text-sm uppercase italic">
                    {{ chat.name }}
                  </h3>
                  <span class="text-[10px] text-slate-500 font-bold">{{
                    formatDate(chat.lastMessageTime)
                  }}</span>
                </div>
                <p class="text-xs text-slate-400 truncate mt-0.5 font-medium">
                  {{ chat.lastMessage }}
                </p>
              </div>
            </div>
          </button>
        </transition-group>
      </div>
    </aside>

    <main
      :class="[
        selectedChat ? 'flex' : 'hidden md:flex',
        'flex-1 flex flex-col bg-[#f8fafc] relative',
      ]"
    >
      <template v-if="selectedChat">
        <header
          class="h-20 px-6 bg-slate-900 backdrop-blur-md border-b border-slate-200 flex justify-between items-center z-20"
        >
          <div class="flex items-center gap-4">
            <button
              class="md:hidden p-2 hover:bg-slate-100 rounded-full"
              @click="selectedChat = null"
            >
              <ArrowLeft class="w-5 h-5 text-slate-600" />
            </button>
            <div
              class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black italic"
            >
              {{ selectedChat.avatar }}
            </div>
            <div>
              <h3 class="font-black text-white uppercase italic tracking-tight">
                {{ selectedChat.name }}
              </h3>
              <p
                class="text-[10px] font-bold text-blue-600 uppercase tracking-widest"
              >
                {{
                  selectedChat.type === "group"
                    ? `${selectedChat.participants.length} Miembros`
                    : getChatOnlineStatus(selectedChat)
                      ? "● En línea"
                      : "Desconectado"
                }}
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <button
              class="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Phone class="w-5 h-5" />
            </button>
            <button
              class="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Video class="w-5 h-5" />
            </button>
          </div>
        </header>

        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-slate-300"
        >
          <transition-group name="chat">
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex flex-col"
              :class="
                message.senderId === 'user1' ? 'items-end' : 'items-start'
              "
            >
              <div
                class="max-w-[75%] px-5 py-3 rounded-3xl shadow-sm text-sm font-medium transition-all"
                :class="
                  message.senderId === 'user1'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-100'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-slate-200/50'
                "
              >
                <p class="leading-relaxed">{{ message.content }}</p>
                <div
                  class="text-[9px] mt-2 font-black uppercase tracking-tighter opacity-60 flex justify-end"
                >
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <footer class="p-6 bg-transparent">
          <form @submit.prevent="sendMessage" class="flex items-end gap-3">
            <div
              class="flex-1 flex items-center gap-3 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl px-4 py-2 focus-within:border-blue-400 transition-all"
            >
              <button type="button" class="text-slate-400 hover:text-blue-600">
                <Plus class="w-5 h-5" />
              </button>

              <input
                v-model="messageInput"
                placeholder="Escribe un mensaje..."
                class="flex-1 py-3 bg-transparent outline-none text-sm font-medium"
                @keypress.enter.prevent="sendMessage"
              />

              <button type="button" class="text-slate-400 hover:text-amber-500">
                <Smile class="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              class="w-[52px] h-[52px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Send class="w-5 h-5" />
            </button>
          </form>
        </footer>
      </template>

      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center text-slate-300"
      >
        <div
          class="w-20 h-20 bg-slate-300 rounded-3xl flex items-center justify-center mb-4 italic font-black text-4xl text-slate-200"
        >
          ?
        </div>
        <p class="font-black uppercase italic tracking-widest text-slate-400">
          Selecciona un chat
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* SIDEBAR LIST */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* CHAT MESSAGES */

.chat-enter-active {
  transition: all 0.2s ease;
}

.chat-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
