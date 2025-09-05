import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EditUserDto } from 'src/user/dto/edit.dto';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeDto } from './dto/create.dto';
import { EditEmployeeDto } from './dto/edit.dto';
import { DeleteEmployeeDto } from './dto/delete.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}


  @Get()
  @HttpCode(200)
  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<EmployeeEntity> {
    return await this.employeeService.findById(id);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() body: CreateEmployeeDto): Promise<EmployeeEntity> {
    return this.employeeService.create(body);
  }
  
  @Put()
  @HttpCode(200)
  async edit(@Body() body: EditEmployeeDto): Promise<EmployeeEntity> {
    return await this.employeeService.edit(body);
  }

  @Delete()
  @HttpCode(200)
  async delete(@Body() body: DeleteEmployeeDto): Promise<string> {
    return await this.employeeService.delete(body);
  }
  
}
