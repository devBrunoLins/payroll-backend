import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeDto } from './dto/create.dto';
import { EditEmployeeDto } from './dto/edit.dto';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';
import { LoggedUser } from '@/common/decorators/logged-user.decorator';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';

@ApiTags('Funcionários')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos os funcionários',
    description: 'Retorna uma lista com todos os funcionários cadastrados no sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de funcionários retornada com sucesso',
    type: [EmployeeEntity]
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar funcionário por ID',
    description: 'Retorna os dados de um funcionário específico baseado no ID fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do funcionário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário encontrado com sucesso',
    type: EmployeeEntity
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async findById(@Param('id') id: string): Promise<EmployeeEntity> {
    return await this.employeeService.findById(id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Criar novo funcionário',
    description: 'Cria um novo funcionário no sistema com os dados fornecidos' 
  })
  @ApiBody({ 
    type: CreateEmployeeDto,
    description: 'Dados do funcionário a ser criado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário criado com sucesso',
    type: EmployeeEntity
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
  async create(@Body() body: CreateEmployeeDto): Promise<EmployeeEntity> {
    return this.employeeService.create(body);
  }
  
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar funcionário',
    description: 'Atualiza os dados de um funcionário existente' 
  })
  @ApiBody({ 
    type: EditEmployeeDto,
    description: 'Dados do funcionário a serem atualizados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário atualizado com sucesso',
    type: EmployeeEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'CPF já existe para outro funcionário da empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do funcionário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  async edit(@Body() body: EditEmployeeDto, @Param('id') id: string): Promise<string> {
    return await this.employeeService.edit(body, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Deletar funcionário',
    description: 'Remove um funcionário do sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionário deletado com sucesso',
    schema: {
      type: 'string',
      example: 'Funcionário deletado com sucesso'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Funcionário não encontrado' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async delete(@Param('id') id: string): Promise<string> {
    return await this.employeeService.delete(id);
  }
}
