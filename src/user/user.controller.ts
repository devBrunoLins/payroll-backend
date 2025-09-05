import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';

@ApiTags('Usuários')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
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
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
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
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado com sucesso',
    type: UserEntity
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
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
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email já cadastrado para esta empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
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
  
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados de um usuário existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({ 
    type: EditUserDto,
    description: 'Dados do usuário a serem atualizados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário atualizado com sucesso',
    type: UserEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email já existe para outro usuário da empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async edit(@Body() body: EditUserDto, @Param('id') id: string): Promise<UserEntity> {
    body.id = id;
    return await this.userService.edit(body);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Deletar usuário',
    description: 'Remove um usuário do sistema' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do usuário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário deletado com sucesso',
    schema: {
      type: 'string',
      example: 'Usuário deletado com sucesso'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async delete(@Param('id') id: string): Promise<string> {
    const deleteDto = { id } as EditUserDto;
    return await this.userService.delete(deleteDto);
  }
}
