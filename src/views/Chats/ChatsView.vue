<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    ArrowLeft,
    Send,
    Video,
    Phone,
    MoreVertical,
    Shield
} from 'lucide-vue-next'

import { chats, chatMessages } from './mockData'

const router = useRouter()

const selectedChat = ref(null)
const messageInput = ref('')
const messages = ref([])
const isEncrypted = ref(false)

const onlineUsers = new Set(['user2', 'user6', 'user7'])

const isUserOnline = (id) => onlineUsers.has(id)

const getChatOnlineStatus = (chat) => {
    if (chat.type === 'private') {
        const other = chat.participants.find(p => p !== 'user1')
        return other ? isUserOnline(other) : false
    }
    return chat.participants.some(p => p !== 'user1' && isUserOnline(p))
}

const selectChat = (chat) => {
    selectedChat.value = chat
    messages.value = chatMessages[chat.id] || []
}

const sendMessage = () => {
    if (!messageInput.value.trim() || !selectedChat.value) return

    messages.value.push({
        id: `m${Date.now()}`,
        senderId: 'user1',
        content: messageInput.value,
        timestamp: new Date(),
        type: 'text'
    })

    messageInput.value = ''
}

const formatTime = (date) =>
    new Date(date).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    })

const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-ES')
</script>

<template>
    <div class="h-screen flex flex-col bg-white">
        <div class="flex-1 flex overflow-hidden">

            <!-- SIDEBAR -->
            <div :class="[
                selectedChat ? 'hidden md:block' : 'block',
                'w-full md:w-80 bg-white border-r border-gray-200'
            ]">
                <div class="p-4">
                    <input type="text" placeholder="Buscar chats..." class="w-full border rounded px-3 py-2" />
                </div>

                <div class="overflow-y-auto h-[calc(100vh-180px)] p-2 space-y-1">
                    <button v-for="chat in chats" :key="chat.id" @click="selectChat(chat)" :class="[
                        'w-full p-4 rounded-lg text-left transition-colors',
                        selectedChat?.id === chat.id
                            ? 'bg-blue-50 border-l-4 border-blue-600'
                            : 'hover:bg-gray-50'
                    ]">
                        <div class="flex gap-3">
                            <div class="relative">
                                <div
                                    class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-2xl">
                                    {{ chat.avatar }}
                                </div>
                                <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                                    :class="getChatOnlineStatus(chat) ? 'bg-green-500' : 'bg-gray-400'" />
                            </div>

                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between mb-1">
                                    <h3 class="font-semibold truncate">{{ chat.name }}</h3>
                                    <span class="text-xs text-gray-500">
                                        {{ formatDate(chat.lastMessageTime) }}
                                    </span>
                                </div>

                                <p class="text-sm text-gray-600 truncate">
                                    {{ chat.lastMessage }}
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- CHAT AREA -->
            <div :class="[
                selectedChat ? 'block' : 'hidden md:block',
                'flex-1 flex flex-col bg-white'
            ]">
                <template v-if="selectedChat">

                    <!-- Chat Header -->
                    <div class="p-4 border-b bg-white shadow-sm">
                        <div class="flex justify-between items-center mb-3">

                            <div class="flex items-center gap-3">
                                <button class="md:hidden p-2" @click="selectedChat = null">
                                    <ArrowLeft class="w-5 h-5" />
                                </button>

                                <div class="relative">
                                    <div
                                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-xl">
                                        {{ selectedChat.avatar }}
                                    </div>
                                    <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                                        :class="getChatOnlineStatus(selectedChat) ? 'bg-green-500' : 'bg-gray-400'" />
                                </div>

                                <div>
                                    <h3 class="font-semibold">{{ selectedChat.name }}</h3>
                                    <p class="text-sm text-gray-500">
                                        {{ selectedChat.type === 'group'
                                            ? selectedChat.participants.length + ' participantes'
                                            : getChatOnlineStatus(selectedChat) ? 'En línea' : 'Desconectado'
                                        }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-2">
                                <Phone class="w-5 h-5 text-gray-600 cursor-pointer" />
                                <Video class="w-5 h-5 text-gray-600 cursor-pointer" />
                                <MoreVertical class="w-5 h-5 text-gray-600 cursor-pointer" />
                            </div>
                        </div>

                        <!-- Switch cifrado -->
                        <div v-if="selectedChat.type === 'private'"
                            class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div class="flex items-center gap-2">
                                <Shield :class="isEncrypted ? 'text-green-600' : 'text-gray-400'" />
                                <span class="text-sm">
                                    {{ isEncrypted ? 'Cifrado activado' : 'Mensajes sin cifrar' }}
                                </span>
                            </div>

                            <input type="checkbox" v-model="isEncrypted" />
                        </div>
                    </div>

                    <!-- Mensajes -->
                    <div class="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                        <div v-for="message in messages" :key="message.id" :class="[
                            'flex gap-2',
                            message.senderId === 'user1' ? 'justify-end' : 'justify-start'
                        ]">
                            <div class="max-w-md px-4 py-2 rounded-2xl" :class="message.senderId === 'user1'
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-200 text-gray-900'">
                                <p class="text-sm">{{ message.content }}</p>
                                <p class="text-xs mt-1 opacity-70">
                                    {{ formatTime(message.timestamp) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="p-4 border-t bg-white">
                        <form @submit.prevent="sendMessage" class="flex gap-2">
                            <input v-model="messageInput" placeholder="Escribe un mensaje..."
                                class="flex-1 border rounded px-3 py-2" />
                            <button type="submit" class="bg-blue-700 text-white px-4 rounded">
                                <Send class="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </template>

                <div v-else class="flex-1 flex items-center justify-center text-gray-400">
                    Selecciona una conversación
                </div>

            </div>
        </div>
    </div>
</template>
