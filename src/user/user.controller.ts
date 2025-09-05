import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { DeleteUserDto } from './dto/delete.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body);
  }
  
  @Put()
  @HttpCode(200)
  async edit(@Body() body: EditUserDto): Promise<UserEntity> {
    return await this.userService.edit(body);
  }

  @Delete()
  @HttpCode(200)
  async delete(@Body() body: DeleteUserDto): Promise<string> {
    return await this.userService.delete(body);
  }
}
