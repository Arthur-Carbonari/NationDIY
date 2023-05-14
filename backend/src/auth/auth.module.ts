import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

/**
The Auth module is responsible for authentication and authorization of users. It provides functionality to sign up new users, log in existing users, and check availability of email or username. It also defines guards to protect routes that require authentication and authorization.
*/

@Module({
  // Import necessary modules
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
       // Factory function for creating JwtModule options 
      useFactory: async (configService :ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: configService.get("JWT_EXPIRES")}
      })
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ,JwtAuthGuard, AdminGuard],
  exports: [JwtAuthGuard, PassportModule, AdminGuard]
})
export class AuthModule {}
