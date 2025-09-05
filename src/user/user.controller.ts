import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { DeleteUserDto } from './dto/delete.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista com todos os usuários cadastrados no sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuários retornada com sucesso',
    type: [UserEntity]
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar usuário por ID',
    description: 'Retorna os dados de um usuário específico baseado no ID fornecido' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado com sucesso',
    type: [UserEntity]
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo usuário',
    description: 'Cria um novo usuário no sistema com os dados fornecidos' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário criado com sucesso',
    type: UserEntity
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'Dados do usuário a serem criados'
  })
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
