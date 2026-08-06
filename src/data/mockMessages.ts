/**
 * Represents a single chat message within a conversation.
 * 
 * @typedef {Object} Message
 * @property {string} id - The unique identifier of the message.
 * @property {string} senderId - The ID of the user who sent the message.
 * @property {string} text - The actual text content of the message.
 * @property {string} timestamp - The formatted time or date the message was sent (e.g., "11:04 am").
 */
export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

/**
 * Represents a conversation thread between the current user and a property host.
 * 
 * @typedef {Object} Conversation
 * @property {string} id - The unique identifier of the conversation.
 * @property {string} hostName - The display name of the host.
 * @property {string} [hostAvatar] - Optional URL to the host's profile picture.
 * @property {boolean} unread - Indicates if the conversation contains unread messages.
 * @property {Message[]} messages - An array of messages belonging to this thread.
 */
export type Conversation = {
  id: string;
  hostName: string;
  hostAvatar?: string;
  unread: boolean;
  messages: Message[];
};

/**
 * Mock identifier for the currently logged-in user.
 * Used for testing conditional rendering (e.g., aligning messages left or right).
 * @type {string}
 */
export const currentUserId = "user-123";

/**
 * Mock data containing a list of conversations for development and testing purposes.
 * Simulates a real API response.
 * @type {Conversation[]}
 */
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