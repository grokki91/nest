import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './users.service';
import { CreateDtoUser } from './dto/create-user';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  public getUser(@Param() { id }): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  public create(@Body() data: CreateDtoUser): Promise<User> {
    return this.userService.createUser(data);
  }

  @Delete(':id')
  public remove(@Param() { id }): Promise<User> {
    return this.userService.removeUser(id);
  }
}
