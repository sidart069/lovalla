import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit {
  private server!: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('Socket.io server initialized');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string): void {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients (including the sender)
    this.server.emit('receiveMessage', message);
  }
}
