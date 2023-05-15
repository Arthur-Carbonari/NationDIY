import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get(":id")
    async getProfile(@Param('id') userId: string) {
        const user = await this.userService.findById(userId)

        if (!user) return

        return user
    }
}
