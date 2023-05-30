import React, { useState, useEffect } from 'react';
import { collection, doc, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const Chat = ({ authorId, authorName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const chatCollectionRef = collection(db, 'chats');
  const chatQuery = query(chatCollectionRef, orderBy('timestamp'));

  useEffect(() => {
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') {
      return;
    }

    try {
      await addDoc(chatCollectionRef, {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        receiverId: authorId,
        receiverName: authorName,
        message: inputMessage.trim(),
        timestamp: new Date(),
      });

      setInputMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <h3>Chat with {authorName}</h3>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <strong>{message.senderName}: </strong>
            {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
