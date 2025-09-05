import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DeleteCompanyDto } from './dto/delete.dto';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create.dto';
import { EditCompanyDto } from './dto/edit.dto';


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
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyService.findAll();
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
    description: 'CPF já cadastrado para esta empresa' 
  })
  async create(@Body() body: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyService.create(body);
  }
  
  @Put()
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
  async edit(@Body() body: EditCompanyDto): Promise<CompanyEntity> {
    return await this.companyService.edit(body);
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Deletar empresa',
    description: 'Remove uma empresa do sistema' 
  })
  @ApiBody({ 
    type: DeleteCompanyDto,
    description: 'ID da empresa a ser deletada'
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
  async delete(@Body() body: DeleteCompanyDto): Promise<string> {
    return await this.companyService.delete(body);
  }
}
