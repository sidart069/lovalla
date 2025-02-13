import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit {
  private server!: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('Socket.io server initialized');
  }

  // Client requests to join a specific room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    // Optionally, send a welcome message to that client or room
    client.emit('receiveMessage', `You have joined room ${room}`);
  }

  // When a client sends a message to a specific room
  @SubscribeMessage('sendRoomMessage')
  handleRoomMessage(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket
  ): void {
    const { room, message } = data;
    console.log(`Message from ${client.id} in room ${room}: ${message}`);
    // Emit the message only to clients in the specified room (including sender)
    this.server.to(room).emit('receiveRoomMessage', message);
  }
}
