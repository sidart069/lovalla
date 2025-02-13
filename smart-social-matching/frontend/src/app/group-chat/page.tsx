"use client";

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const GroupChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState('Extrovert-Villa'); // Example room name; in a real app, this would be dynamic
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server with id:', newSocket.id);
      // Join the specified room
      newSocket.emit('joinRoom', room);
    });

    // Listen for room-specific messages
    newSocket.on('receiveRoomMessage', (msg: string) => {
      console.log('Received room message:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Optionally listen for a welcome message after joining
    newSocket.on('receiveMessage', (msg: string) => {
      console.log('Received message:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  const sendRoomMessage = () => {
    if (message.trim() && socket) {
      // Send message to the specific room
      socket.emit('sendRoomMessage', { room, message });
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Group Chat Room: {room}</h1>
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
          onClick={sendRoomMessage}
          className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChatPage;
