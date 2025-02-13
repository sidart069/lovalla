import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit {
    private server;
    afterInit(server: Server): void;
    handleJoinRoom(room: string, client: Socket): void;
    handleRoomMessage(data: {
        room: string;
        message: string;
    }, client: Socket): void;
}
