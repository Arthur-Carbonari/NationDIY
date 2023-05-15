import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

//this module sets up the necessary database connection and provides the UsersService which is responsible for performing CRUD operations on the User model.

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
