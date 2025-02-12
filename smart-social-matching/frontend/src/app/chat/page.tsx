"use client";

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection and store it in state
    const newSocket = io('http://localhost:3000', {
      // Optionally, you can add configuration options here.
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server with id:', newSocket.id);
    });

    newSocket.on('receiveMessage', (msg: string) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      console.log('Sending message:', message);
      socket.emit('sendMessage', message);
      setMessage('');
    } else if (!socket) {
      console.warn('Socket not initialized yet.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Chat</h1>
      <div
        style={{
          marginBottom: '1rem',
          border: '1px solid #ccc',
          padding: '1rem',
          height: '300px',
          overflowY: 'auto',
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: '0.5rem 0' }}>
            {msg}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: '0.5rem', width: '80%', marginRight: '0.5rem' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
