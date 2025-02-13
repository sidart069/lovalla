"use client";

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server with id:', newSocket.id);
    });

    newSocket.on('receiveMessage', (msg: string) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      console.log('Sending message:', message);
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Chat</h1>
      <div className="mb-6 border border-gray-300 p-4 h-80 overflow-y-auto rounded-md shadow-sm">
        {messages.map((msg, index) => (
          <p key={index} className="my-1 text-gray-800">{msg}</p>
        ))}
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
