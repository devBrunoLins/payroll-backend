import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { DeleteUserDto } from './dto/delete.dto';
import { SigninDto } from './dto/sign-in.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Login do usuário',
    description: 'Realiza o login do usuário no sistema' 
  })
  @ApiBody({ 
    type: SigninDto,
    description: 'Dados do usuário a serem utilizados para login'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login do usuário realizado com sucesso',
    example: { access_token: 'token' }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor',
  })
  async signIn(@Body() body: SigninDto): Promise<{ access_token: string }> {
    return await this.userService.signIn(body);
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
