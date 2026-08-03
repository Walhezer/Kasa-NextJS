export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  hostName: string;
  hostAvatar?: string;
  unread: boolean;
  messages: Message[];
};

export const currentUserId = "user-123";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    hostName: "Utilisateur",
    unread: true,
    messages: [
      {
        id: "m1",
        senderId: "host-1",
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        timestamp: "11:04 am",
      },
      {
        id: "m2",
        senderId: currentUserId,
        text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        timestamp: "11:04 am",
      }
    ],
  },
  {
    id: "conv-2",
    hostName: "Alexandre",
    unread: false,
    messages: [
      {
        id: "m3",
        senderId: currentUserId,
        text: "Super, merci pour l'information !",
        timestamp: "Hier",
      }
    ],
  },
  {
    id: "conv-3",
    hostName: "Marie",
    unread: true,
    messages: [
      {
        id: "m4",
        senderId: "host-3",
        text: "Avez-vous besoin de draps supplémentaires ?",
        timestamp: "10:30 am",
      }
    ],
  }
];