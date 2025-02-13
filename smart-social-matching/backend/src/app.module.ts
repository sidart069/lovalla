import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { AssessmentModule } from './assessment/assessment.module';
import { MatchingModule } from './matching/matching.module';

@Module({
  imports: [UserModule, GroupModule, AuthModule, AssessmentModule, MatchingModule],
  providers: [ChatGateway],
})
export class AppModule {}
