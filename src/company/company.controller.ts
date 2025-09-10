import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create.dto';
import { EditCompanyDto } from './dto/edit.dto';
import { EmployeeEntity } from '@/employee/employee.entity';
import { LoggedUser } from '@/common/decorators/logged-user.decorator';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';


@ApiTags('Empresas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Listar todos as empresas',
    description: 'Retorna uma lista com todos as empresas cadastradas no sistema' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de empresas retornada com sucesso',
    type: [CompanyEntity]
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async findAll(@LoggedUser() user: ITokenPayload): Promise<CompanyEntity[]> {
    return await this.companyService.findAll(user.company_id);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar empresa por ID',
    description: 'Retorna os dados de uma empresa específica baseado no ID fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Empresa encontrada com sucesso',
    type: CompanyEntity
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Empresa não encontrada' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async findById(@Param('id') id: string): Promise<CompanyEntity> {
    return await this.companyService.findById(id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Criar nova empresa',
    description: 'Cria uma nova empresa no sistema com os dados fornecidos' 
  })
  @ApiBody({ 
    type: CreateCompanyDto,
    description: 'Dados da empresa a ser criada'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Empresa criada com sucesso',
    type: CompanyEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'CNPJ já cadastrado no sistema' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async create(@Body() body: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyService.create(body);
  }
  
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Atualizar empresa',
    description: 'Atualiza os dados de uma empresa existente' 
  })
  @ApiBody({ 
    type: EditCompanyDto,
    description: 'Dados da empresa a serem atualizados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Empresa atualizada com sucesso',
    type: CompanyEntity
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Empresa não encontrada' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'CNPJ já existe para outra empresa' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  async edit(
    @Body() body: EditCompanyDto,
    @Param('id') id: string
  ): Promise<string> {
    return await this.companyService.edit(body, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Deletar empresa',
    description: 'Remove uma empresa do sistema' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único da empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Empresa deletada com sucesso',
    schema: {
      type: 'string',
      example: 'Empresa deletada com sucesso'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Empresa não encontrada' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async delete(@Param('id') id: string): Promise<string> {
    return await this.companyService.delete(id);
  }

  @Get('employees/:company_id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Buscar funcionários da empresa',
    description: 'Remove uma empresa do sistema' 
  })
  @ApiParam({ 
    name: 'company_id', 
    description: 'ID único da empresa (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Funcionários da empresa retornados com sucesso',
    schema: {
      type: 'string',
      example: 'Funcionários da empresa retornados com sucesso'
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'ID inválido fornecido' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Empresa não encontrada' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de acesso inválido ou não fornecido' 
  })
  async getEmployeesByCompany(@Param('company_id') company_id: string): Promise<EmployeeEntity[]> {
    return await this.companyService.getEmployeesByCompany(company_id);
  }
}
