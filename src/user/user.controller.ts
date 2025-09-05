import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body);
  }
}
