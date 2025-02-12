import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit {
    private server;
    afterInit(server: Server): void;
    handleMessage(message: string): void;
}
