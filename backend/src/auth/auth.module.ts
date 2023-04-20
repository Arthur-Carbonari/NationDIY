import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: process.env.JWT_EXPIRES}}),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
