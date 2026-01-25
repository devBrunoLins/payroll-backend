import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { DependentsService } from './dependents.service';
import { CreateDependentsDto } from './dto/create.dto';
import { EditDependentsDto } from './dto/edit.dto';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';
import { LoggedUser } from '@/common/decorators/logged-user.decorator';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';
import { DependentsEntity } from './dependents.entity';

@ApiTags('Dependentes')
@ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
@Controller('dependents')
export class DependentsController {
  constructor(private readonly dependentsService: DependentsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os dependentes',
    description: 'Retorna uma lista com todos os funcionários cadastrados no sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de dependentes retornada com sucesso',
    type: [DependentsEntity]
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async findAll(@LoggedUser() user: ITokenPayload): Promise<DependentsEntity[]> {
    return await this.dependentsService.findAll(user.company_id);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar dependente por ID',
    description: 'Retorna os dados de um dependente específico baseado no ID fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do dependente (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Dependente encontrado com sucesso',
    type: DependentsEntity
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Dependente não encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async findById(@Param('id') id: string, @LoggedUser() user: ITokenPayload): Promise<DependentsEntity> {
    return await this.dependentsService.findById(id, user.company_id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Criar novo dependente',
    description: 'Cria um novo dependente no sistema com os dados fornecidos' 
  })
  @ApiBody({ 
    type: CreateDependentsDto,
    description: 'Dados do dependente a ser criado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Dependente criado com sucesso',
    type: DependentsEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'CPF já cadastrado para esta empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async create(@Body() body: CreateDependentsDto, @LoggedUser() user: ITokenPayload): Promise<DependentsEntity> {
    return this.dependentsService.create(body, user);
  }


  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar dependente',
    description: 'Atualiza os dados de um dependente existente' 
  })
  @ApiBody({ 
    type: EditDependentsDto,
    description: 'Dados do dependente a serem atualizados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Dependente atualizado com sucesso',
    type: DependentsEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Dependente não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'CPF já existe para outro dependente da empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do dependente (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  async edit(
    @Body() body: EditDependentsDto,
    @Param('id') id: string
  ): Promise<string> {
    return await this.dependentsService.edit(body, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Deletar dependente',
    description: 'Remove um dependente do sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Dependente deletado com sucesso',
    schema: {
      type: 'string',
      example: 'Dependente deletado com sucesso'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Dependente não encontrado' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async delete(
    @Param('id') id: string,
    @LoggedUser() user: ITokenPayload
  ): Promise<string> {
    return await this.dependentsService.delete(id, user.company_id);
  }
}
