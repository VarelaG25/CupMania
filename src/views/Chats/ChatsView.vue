<script setup lang="ts">
import { ref, nextTick, watch, computed, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import {
  ArrowLeft,
  Send,
  Search,
  UserPlus,
  X,
  Users,
  Check,
} from "lucide-vue-next";

import VInput from "@/components/VInpput/VInput.vue";
import type { ChatMessage, Chat } from "./interfaces";
import { useUserStore } from "@/store/userStore";

// ---------------- STORE ----------------
const userStore = useUserStore();
const user = computed(() => userStore.user);

// ---------------- SOCKET ----------------
const API_URL = "http://localhost:3000";
let socket: Socket;

// ---------------- STATE ----------------
const chatContainer = ref<HTMLElement | null>(null);
const selectedChat = ref<Chat | null>(null);

const messageInput = ref("");
const chats = ref<Chat[]>([]);
const messages = ref<ChatMessage[]>([]);

const searchMessage = ref("");
const searchContact = ref("");
const searchNewChat = ref("");

const showGroupModal = ref(false);
const showCreateGroupModal = ref(false);
const showNewChatModal = ref(false);

const newGroupName = ref("");
const selectedContacts = ref<string[]>([]);
const availableContacts = ref<any[]>([]);

// ---------------- INIT ----------------
onMounted(async () => {
  socket = io(API_URL);

  // 📩 RECEIVE MESSAGE
  socket.on("receive_message", (msg: ChatMessage) => {
    const isCurrentChat = selectedChat.value?.id === msg.chatId;

    if (isCurrentChat) {
      messages.value.push(msg);
    }

    const chat = chats.value.find((c) => c.id === msg.chatId);
    if (chat) {
      chat.lastMessage = msg.content;
      chat.lastMessageTime = msg.timestamp;
    }
  });

  // 🔄 REFRESH CHATS
  socket.on("refresh_chats", async () => {
    const res = await fetch(`${API_URL}/api/chats/${useUserStore().user?.id}`);
    chats.value = await res.json();
  });

  const [resChats, resUsers] = await Promise.all([
    fetch(`${API_URL}/api/chats/${useUserStore().user?.id}`),
    fetch(`${API_URL}/api/users`),
  ]);

  chats.value = await resChats.json();
  availableContacts.value = await resUsers.json();
});

onUnmounted(() => {
  socket?.disconnect();
});

// ---------------- CHAT SELECT ----------------
const selectChat = async (chat: Chat) => {
  selectedChat.value = chat;

  socket.emit("join_chat", chat.id);

  const res = await fetch(`${API_URL}/api/messages/${chat.id}`);
  messages.value = await res.json();

  scrollToBottom();
};

const getChatDisplayName = (chat: Chat) => {
  if (chat.type === "group") return chat.name;

  const otherId = chat.participants?.find((id) => id !== user.value?.id);

  const otherUser = availableContacts.value.find((u) => u.id === otherId);

  return otherUser?.name || "Chat";
};

const getChatAvatar = (chat: Chat) => {
  if (chat.type === "group") return chat.avatar;

  const otherId = chat.participants?.find((id) => id !== user.value?.id);

  const otherUser = availableContacts.value.find((u) => u.id === otherId);

  return otherUser?.avatar || "👤";
};

const isGroup = computed(() => selectedChat.value?.type === "group");

// ---------------- SEND MESSAGE ----------------
const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedChat.value || !user.value) return;

  socket.emit("send_message", {
    chatId: selectedChat.value.id,
    senderId: user.value.id,
    senderName: user.value.name,
    content: messageInput.value,
    type: "text",
  });

  messageInput.value = "";
};

// ---------------- NEW CHAT (DM) ----------------
const filteredNewChats = computed(() => {
  const q = searchNewChat.value.toLowerCase().trim();

  return availableContacts.value.filter((u) => {
    if (u.id === user.value?.id) return false;
    return u.name.toLowerCase().includes(q);
  });
});

const openOrCreatePrivateChat = async (target: any) => {
  if (!user.value) return;

  let chat = chats.value.find(
    (c) =>
      c.type === "private" &&
      c.participants.includes(user.value!.id) &&
      c.participants.includes(target.id),
  );

  if (!chat) {
    const newChat = {
      id: `p_${Date.now()}`,
      name: target.name,
      type: "private",
      avatar: target.avatar,
      participants: [user.value.id, target.id],
      lastMessage: "",
      lastMessageTime: new Date().toISOString(),
    };

    await fetch(`${API_URL}/api/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChat),
    });

    chats.value.unshift(newChat as Chat);
    socket.emit("refresh_chats");

    chat = newChat as Chat;
  }

  showNewChatModal.value = false;
  selectChat(chat);
};

// ---------------- GROUP ----------------
const handleCreateGroup = async () => {
  if (!newGroupName.value || !user.value) return;

  const uniqueParticipants = Array.from(
    new Set([user.value.id, ...selectedContacts.value]),
  );

  const newGroup = {
    id: `g${Date.now()}`,
    name: newGroupName.value,
    type: "group",
    avatar: "👥",
    participants: uniqueParticipants,
  };

  await fetch(`${API_URL}/api/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGroup),
  });

  chats.value.unshift(newGroup as Chat);

  showCreateGroupModal.value = false;
  newGroupName.value = "";
  selectedContacts.value = [];

  socket.emit("refresh_chats");
};

// ---------------- UI HELPERS ----------------
const isMine = (msg: ChatMessage) => {
  return msg.senderId === user.value?.id;
};

const toggleContact = (id: string) => {
  const i = selectedContacts.value.indexOf(id);
  i > -1
    ? selectedContacts.value.splice(i, 1)
    : selectedContacts.value.push(id);
};

const scrollToBottom = async () => {
  await nextTick();
  chatContainer.value?.scrollTo(0, chatContainer.value.scrollHeight);
};

watch(messages, scrollToBottom, { deep: true });

// ---------------- FILTERS ----------------
const filteredChats = computed(() => {
  const q = searchMessage.value.toLowerCase().trim();

  return chats.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q),
  );
});

const filteredContacts = computed(() => {
  const q = searchContact.value.toLowerCase().trim();
  return availableContacts.value.filter((c) =>
    c.name.toLowerCase().includes(q),
  );
});

// ---------------- FORMAT ----------------
const formatTime = (d: string | Date) =>
  new Date(d).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<template>
  <div class="h-screen flex bg-slate-50 overflow-hidden relative">
    <!-- ===================== MODAL: NUEVO CHAT (USUARIOS) ===================== -->
    <div
      v-if="showNewChatModal"
      class="absolute inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="font-bold">Nuevo chat</h2>
          <button @click="showNewChatModal = false">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="p-4 space-y-3">
          <VInput
            v-model="searchNewChat"
            placeholder="Buscar usuario..."
            :icon="Search"
          />

          <div class="max-h-60 overflow-y-auto space-y-2 mt-2">
            <div
              v-for="u in filteredNewChats"
              :key="u.id"
              @click="openOrCreatePrivateChat(u)"
              class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <div
                class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
              >
                {{ u.avatar }}
              </div>

              <div class="flex-1">
                <p class="text-sm font-semibold">{{ u.name }}</p>
                <p class="text-xs text-slate-400">
                  {{ u.online ? "En línea" : "Desconectado" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL: CREAR GRUPO ===================== -->
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

    <!-- ===================== MODAL: AÑADIR MIEMBROS ===================== -->
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
              class="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-slate-800"
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

    <!-- ===================== SIDEBAR ===================== -->
    <aside
      :class="[
        selectedChat ? 'hidden md:flex' : 'flex',
        'w-full md:w-80 flex-col bg-slate-900 text-white border-r border-slate-700',
      ]"
    >
      <div class="p-4 border-b border-slate-800">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-black text-blue-400">Mensajes</h1>

          <div class="flex gap-2">
            <button
              @click="showNewChatModal = true"
              class="p-2 hover:bg-slate-800 rounded-lg text-green-400"
            >
              <UserPlus class="w-5 h-5" />
            </button>

            <button
              @click="showCreateGroupModal = true"
              class="p-2 hover:bg-slate-800 rounded-lg text-blue-400"
            >
              <Users class="w-5 h-5" />
            </button>
          </div>
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
            <div
              class="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold"
            >
              {{ getChatAvatar(chat as Chat) }}
            </div>

            <div class="flex-1 overflow-hidden">
              <p class="font-bold text-sm truncate">
                {{ getChatDisplayName(chat as Chat) }}
              </p>
              <p class="text-xs text-slate-400 truncate">
                {{ chat.lastMessage }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </aside>

    <!-- ===================== CHAT ===================== -->
    <main class="flex-1 flex flex-col bg-slate-100">
      <template v-if="selectedChat">
        <header
          class="h-16 bg-slate-900 flex items-center justify-between px-4 text-white"
        >
          <div class="flex items-center gap-3">
            <button class="md:hidden" @click="selectedChat = null">
              <ArrowLeft />
            </button>

            <div
              class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"
            >
              {{ selectedChat.avatar }}
            </div>

            <div>
              <p class="font-bold">{{ selectedChat.name }}</p>
              <p class="text-xs text-blue-400">
                {{
                  selectedChat.type === "group"
                    ? (selectedChat.participants?.length || 0) + " miembros"
                    : "Chat"
                }}
              </p>
            </div>
          </div>
        </header>

        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-300"
        >
          <div
            v-for="m in messages"
            :key="m.id"
            class="flex"
            :class="isMine(m) ? 'justify-end' : 'justify-start'"
          >
            <div
              class="px-4 py-2 rounded-2xl max-w-[75%] text-sm"
              :class="
                isMine(m)
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-gray-200 text-slate-800 rounded-tl-none'
              "
            >
              <p
                v-if="isGroup && !isMine(m)"
                class="text-[11px] font-bold mb-1 opacity-70"
              >
                {{ m.senderName }}
              </p>
              {{ m.content }}
              <div class="text-[10px] opacity-60 text-right mt-1">
                {{ formatTime(m.timestamp) }}
              </div>
            </div>
          </div>
        </div>

        <footer class="p-4 bg-white flex gap-2">
          <input
            v-model="messageInput"
            class="flex-1 bg-slate-100 rounded-xl px-4 py-2"
            placeholder="Escribe..."
            @keypress.enter.prevent="sendMessage"
          />

          <button
            @click="sendMessage"
            class="bg-blue-600 text-white px-4 rounded-xl"
          >
            <Send />
          </button>
        </footer>
      </template>

      <div
        v-else
        class="flex-1 flex items-center justify-center text-slate-400"
      >
        Selecciona un chat
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
