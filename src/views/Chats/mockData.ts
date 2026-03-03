// Mock data for FIFA World Cup 2026 Tourist App

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
  matches: number;
}

export interface Team {
  id: string;
  name: string;
  group: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "video-call";
}

export interface Chat {
  id: string;
  name: string;
  type: "group" | "private";
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  participants: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  completed: boolean;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
  matchesAttended: number;
  citiesVisited: number;
  badges: Badge[];
}

export const stadiums: Stadium[] = [
  {
    id: "1",
    name: "Estadio Azteca",
    city: "Ciudad de México",
    country: "México",
    capacity: 87523,
    image:
      "https://images.unsplash.com/photo-1761941336817-1c258e7ef78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzIwNDY0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 5,
  },
  {
    id: "2",
    name: "MetLife Stadium",
    city: "Nueva York/Nueva Jersey",
    country: "Estados Unidos",
    capacity: 82500,
    image:
      "https://images.unsplash.com/photo-1690339837871-4e8ddc3ae245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5hZGlhbiUyMHN0YWRpdW0lMjBzcG9ydHMlMjB2ZW51ZXxlbnwxfHx8fDE3NzIwNDY0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 8,
  },
  {
    id: "3",
    name: "BMO Field",
    city: "Toronto",
    country: "Canadá",
    capacity: 45500,
    image:
      "https://images.unsplash.com/photo-1765046894839-29753508f446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwY2VsZWJyYXRpbmclMjB2aWN0b3J5fGVufDF8fHx8MTc3MTk5MDY3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 6,
  },
  {
    id: "4",
    name: "SoFi Stadium",
    city: "Los Ángeles",
    country: "Estados Unidos",
    capacity: 70240,
    image:
      "https://images.unsplash.com/photo-1761941336817-1c258e7ef78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzIwNDY0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 7,
  },
  {
    id: "5",
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "México",
    capacity: 53500,
    image:
      "https://images.unsplash.com/photo-1690339837871-4e8ddc3ae245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5hZGlhbiUyMHN0YWRpdW0lMjBzcG9ydHMlMjB2ZW51ZXxlbnwxfHx8fDE3NzIwNDY0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 6,
  },
  {
    id: "6",
    name: "BC Place",
    city: "Vancouver",
    country: "Canadá",
    capacity: 54500,
    image:
      "https://images.unsplash.com/photo-1765046894839-29753508f446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwY2VsZWJyYXRpbmclMjB2aWN0b3J5fGVufDF8fHx8MTc3MTk5MDY3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    matches: 5,
  },
];

export const teams: Team[] = [
  {
    id: "1",
    name: "México",
    group: "A",
    flag: "🇲🇽",
    played: 2,
    won: 2,
    drawn: 0,
    lost: 0,
    points: 6,
  },
  {
    id: "2",
    name: "Estados Unidos",
    group: "A",
    flag: "🇺🇸",
    played: 2,
    won: 1,
    drawn: 1,
    lost: 0,
    points: 4,
  },
  {
    id: "3",
    name: "Canadá",
    group: "A",
    flag: "🇨🇦",
    played: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    points: 3,
  },
  {
    id: "4",
    name: "Jamaica",
    group: "A",
    flag: "🇯🇲",
    played: 2,
    won: 0,
    drawn: 1,
    lost: 1,
    points: 1,
  },
  {
    id: "5",
    name: "Brasil",
    group: "B",
    flag: "🇧🇷",
    played: 2,
    won: 2,
    drawn: 0,
    lost: 0,
    points: 6,
  },
  {
    id: "6",
    name: "Argentina",
    group: "B",
    flag: "🇦🇷",
    played: 2,
    won: 1,
    drawn: 1,
    lost: 0,
    points: 4,
  },
  {
    id: "7",
    name: "Uruguay",
    group: "B",
    flag: "🇺🇾",
    played: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    points: 3,
  },
  {
    id: "8",
    name: "Chile",
    group: "B",
    flag: "🇨🇱",
    played: 2,
    won: 0,
    drawn: 1,
    lost: 1,
    points: 1,
  },
  {
    id: "9",
    name: "España",
    group: "C",
    flag: "🇪🇸",
    played: 2,
    won: 2,
    drawn: 0,
    lost: 0,
    points: 6,
  },
  {
    id: "10",
    name: "Alemania",
    group: "C",
    flag: "🇩🇪",
    played: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    points: 3,
  },
  {
    id: "11",
    name: "Portugal",
    group: "C",
    flag: "🇵🇹",
    played: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    points: 3,
  },
  {
    id: "12",
    name: "Polonia",
    group: "C",
    flag: "🇵🇱",
    played: 2,
    won: 0,
    drawn: 0,
    lost: 2,
    points: 0,
  },
];

export const chats: Chat[] = [
  {
    id: "1",
    name: "Grupo México 🇲🇽",
    type: "group",
    avatar: "🇲🇽",
    lastMessage: "¡Nos vemos en el Azteca!",
    lastMessageTime: new Date("2026-06-11T14:30:00"),
    unread: 3,
    participants: ["user1", "user2", "user3", "user4"],
  },
  {
    id: "2",
    name: "Fanáticos del Mundial",
    type: "group",
    avatar: "⚽",
    lastMessage: "Los boletos ya están confirmados",
    lastMessageTime: new Date("2026-06-11T10:15:00"),
    unread: 0,
    participants: ["user1", "user2", "user3", "user4", "user5"],
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    type: "private",
    avatar: "👨",
    lastMessage: "¿A qué hora llegamos al estadio?",
    lastMessageTime: new Date("2026-06-10T18:45:00"),
    unread: 1,
    participants: ["user1", "user6"],
  },
  {
    id: "4",
    name: "Toronto Travel Group",
    type: "group",
    avatar: "🇨🇦",
    lastMessage: "Hotel reservado en downtown",
    lastMessageTime: new Date("2026-06-09T16:20:00"),
    unread: 5,
    participants: ["user1", "user7", "user8"],
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "Comprar boletos para México vs Brasil",
    description: "Conseguir entradas para el partido del 15 de junio",
    assignedTo: ["user1", "user2"],
    completed: true,
    dueDate: new Date("2026-06-05"),
    priority: "high",
    points: 25,
  },
  {
    id: "2",
    title: "Reservar hotel en Toronto",
    description: "Hotel cerca de BMO Field para los partidos del 18-20",
    assignedTo: ["user1"],
    completed: false,
    dueDate: new Date("2026-06-15"),
    priority: "high",
    points: 25,
  },
  {
    id: "3",
    title: "Organizar transporte al Estadio Azteca",
    description: "Coordinar viaje compartido desde el hotel",
    assignedTo: ["user3", "user4"],
    completed: false,
    dueDate: new Date("2026-06-12"),
    priority: "medium",
    points: 25,
  },
  {
    id: "4",
    title: "Comprar merchandising oficial",
    description: "Camisetas y souvenirs del Mundial",
    assignedTo: ["user2"],
    completed: true,
    dueDate: new Date("2026-06-08"),
    priority: "low",
    points: 25,
  },
  {
    id: "5",
    title: "Visitar sitios turísticos en Vancouver",
    description: "Stanley Park, Granville Island",
    assignedTo: ["user1", "user3"],
    completed: false,
    dueDate: new Date("2026-06-22"),
    priority: "medium",
    points: 25,
  },
];

export const badges: Badge[] = [
  {
    id: "1",
    name: "Primer Partido",
    description: "Asististe a tu primer partido del Mundial",
    icon: "⚽",
    earned: true,
    earnedDate: new Date("2026-06-11"),
    rarity: "common",
  },
  {
    id: "2",
    name: "Trotamundos",
    description: "Visitaste estadios en los 3 países anfitriones",
    icon: "🌎",
    earned: true,
    earnedDate: new Date("2026-06-18"),
    rarity: "rare",
  },
  {
    id: "3",
    name: "Fan Dedicado",
    description: "Asististe a 5 partidos o más",
    icon: "🏆",
    earned: false,
    rarity: "epic",
  },
  {
    id: "4",
    name: "Explorador Cultural",
    description: "Visitaste 10 sitios turísticos diferentes",
    icon: "🗽",
    earned: true,
    earnedDate: new Date("2026-06-15"),
    rarity: "rare",
  },
  {
    id: "5",
    name: "Leyenda del Mundial",
    description: "Completaste todas las experiencias del Mundial",
    icon: "👑",
    earned: false,
    rarity: "legendary",
  },
  {
    id: "6",
    name: "Fotógrafo Estrella",
    description: "Compartiste 20 fotos del Mundial",
    icon: "📸",
    earned: true,
    earnedDate: new Date("2026-06-14"),
    rarity: "common",
  },
  {
    id: "7",
    name: "Social Butterfly",
    description: "Hiciste 10 nuevos amigos en la app",
    icon: "🦋",
    earned: false,
    rarity: "rare",
  },
  {
    id: "8",
    name: "Coleccionista",
    description: "Obtuviste merchandising de 5 equipos diferentes",
    icon: "🎫",
    earned: true,
    earnedDate: new Date("2026-06-12"),
    rarity: "epic",
  },
];

export const currentUser: UserProfile = {
  id: "user1",
  name: "Ana García",
  email: "ana.garcia@email.com",
  avatar: "👩",
  points: 2850,
  level: 7,
  matchesAttended: 3,
  citiesVisited: 5,
  badges: badges,
};

export const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "m1",
      senderId: "user2",
      senderName: "Carlos",
      senderAvatar: "👨",
      content: "Hola a todos! ¿Listos para el partido de mañana?",
      timestamp: new Date("2026-06-11T13:00:00"),
      type: "text",
    },
    {
      id: "m2",
      senderId: "user3",
      senderName: "María",
      senderAvatar: "👩",
      content: "¡Sí! Ya tengo mi camiseta lista",
      timestamp: new Date("2026-06-11T13:15:00"),
      type: "text",
    },
    {
      id: "m3",
      senderId: "user1",
      senderName: "Ana",
      senderAvatar: "👩",
      content: "Perfecto! Nos encontramos a las 2pm en la entrada principal",
      timestamp: new Date("2026-06-11T14:00:00"),
      type: "text",
    },
    {
      id: "m4",
      senderId: "user4",
      senderName: "Diego",
      senderAvatar: "👨",
      content: "¡Nos vemos en el Azteca!",
      timestamp: new Date("2026-06-11T14:30:00"),
      type: "text",
    },
  ],
  "2": [
    {
      id: "m5",
      senderId: "user5",
      senderName: "Roberto",
      senderAvatar: "👨",
      content: "Los boletos ya están confirmados",
      timestamp: new Date("2026-06-11T10:15:00"),
      type: "text",
    },
  ],
  "3": [
    {
      id: "m6",
      senderId: "user6",
      senderName: "Carlos Rodríguez",
      senderAvatar: "👨",
      content: "¿A qué hora llegamos al estadio?",
      timestamp: new Date("2026-06-10T18:45:00"),
      type: "text",
    },
  ],
  "4": [
    {
      id: "m7",
      senderId: "user7",
      senderName: "Sarah",
      senderAvatar: "👩",
      content: "Hotel reservado en downtown",
      timestamp: new Date("2026-06-09T16:20:00"),
      type: "text",
    },
  ],
};
