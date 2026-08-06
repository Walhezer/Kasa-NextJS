'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Messages.module.css';
import { mockConversations, currentUserId, Conversation, Message } from '../../../data/mockMessages';
import { ArrowLeftIcon, ArrowUpIcon } from '../../../components/Icons';

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const currentConversation = conversations.find((c) => c.id === selectedId);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, unread: false } : conv))
    );
  };

  const handleBack = () => {
    if (selectedId) {
      setSelectedId(null);
    } else {
      router.back();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );
    setInputValue('');
  };

  return (
    <div className={styles.container}>

      {/* --- LEFT COLUMN: LIST OF CONVERSATIONS --- */}
      <aside className={`${styles.sidebar} ${selectedId ? styles.hiddenOnMobile : ''}`}>
        <button className={styles.backButton} onClick={() => router.back()} type="button">
          <ArrowLeftIcon /> Retour
        </button>
        <h1 className={styles.title}>Messages</h1>

        <ul className={styles.conversationList}>
          {conversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            return (
              <li
                key={conv.id}
                className={`${styles.conversationItem} ${selectedId === conv.id ? styles.active : ''}`}
                onClick={() => handleSelectConversation(conv.id)}
              >
                <div className={styles.avatarPlaceholder}></div>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationHeader}>
                    <span className={styles.hostName}>{conv.hostName}</span>
                    <span className={styles.time}>{lastMessage?.timestamp}</span>
                  </div>
                  <div className={styles.messagePreviewContainer}>
                    <p className={styles.messagePreview}>{lastMessage?.text}</p>
                    {conv.unread && <span className={styles.unreadDot}></span>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* --- RIGHT COLUMN: CHAT DETAILS --- */}
      <div className={`${styles.chatArea} ${!selectedId ? styles.hiddenOnMobile : ''}`}>
        {currentConversation ? (
          <>
            <button className={`${styles.backButton} ${styles.mobileOnlyBackButton}`} onClick={handleBack} type="button">
              <ArrowLeftIcon /> Retour
            </button>

            <div className={styles.messagesContainer}>
              <div className={styles.dateSeparator}>
                <span>03 Septembre 2025</span>
              </div>

              {currentConversation.messages.map((msg) => {
                const isMine = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={`${styles.messageWrapper} ${isMine ? styles.mine : styles.theirs}`}>
                    {!isMine && <div className={styles.avatarPlaceholderSmall}></div>}
                    <div className={styles.messageContent}>
                      <span className={styles.messageMeta}>
                        {isMine ? 'Utilisateur' : currentConversation.hostName} • {msg.timestamp}
                      </span>
                      <div className={styles.bubble}>
                        {msg.text}
                      </div>
                    </div>
                    {isMine && <div className={styles.avatarPlaceholderSmall}></div>}
                  </div>
                );
              })}
            </div>

            <form className={styles.inputArea} onSubmit={handleSendMessage}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Envoyer un message"
                  aria-label="Saisir un message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.sendButton} aria-label="Envoyer" disabled={!inputValue.trim()}>
                  <ArrowUpIcon />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.noSelection}>
            <p>Sélectionnez une conversation pour afficher les messages</p>
          </div>
        )}
      </div>
    </div>
  );
}