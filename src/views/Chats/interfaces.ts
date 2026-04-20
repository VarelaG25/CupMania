interface User {
  id: string;
  name: string;
  avatar: string; // Emoji o URL de imagen
  status?: "online" | "offline";
}

interface ChatMessage {
  id: string; // UUID generado por DB
  chatId: string; // Crucial para saber a qué chat pertenece
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string; // ISO String recomendado
  type: "text" | "image" | "system";
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: "private" | "group";
  participants: string[];
  lastMessage?: string;
  lastMessageTime: string | Date;
}

export type { User, ChatMessage, Chat };
