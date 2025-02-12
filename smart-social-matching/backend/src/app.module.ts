// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [UserModule, GroupModule],
  providers: [ChatGateway],
})
export class AppModule {}
