import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),     // configure global root 
    MongooseModule.forRoot(process.env.MONGO_URI || ""),
    UsersModule,
    QuestionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
