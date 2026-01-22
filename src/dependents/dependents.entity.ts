import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique, Index, DeleteDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../company/company.entity'
import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator'
import { EmployeeEntity } from '@/employee/employee.entity'

@Entity('dependents')
export class DependentsEntity {
  @ApiProperty({
    description: 'ID único do dependente',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Nome completo do dependente',
    example: 'João Silva Santos',
    minLength: 2
  })
  @Column()
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString()
  @MinLength(2, { message: 'Nome completo deve ter pelo menos 2 caracteres' })
  full_name: string

  @ApiProperty({
    description: 'CPF do dependente',
    example: '12345678900',
    minLength: 2
  })
  @Column()
  @IsString()
  @IsOptional()
  @Matches(/^\d{3}\\d{3}\\d{3}\d{2}$/, { 
    message: 'CPF deve estar no formato XXXXXXXXXXX' 
  })
  cpf: string

  @ApiProperty({
    description: 'RG do dependente',
    example: '123456789',
    minLength: 9
  })
  @Column()
  @IsString()
  @IsOptional()
  @Matches(/^\d{3}\\d{3}\\d{3}$/, { 
    message: 'RG deve estar no formato XXXXXXXXX' 
  })
  rg: string

  @ApiProperty({
    description: 'Data de nascimento do dependente',
    example: '2024-01-15',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @IsDateString({}, { message: 'Data de nascimento deve estar no formato YYYY-MM-DD' })
  @Column()
  birth_date: string

  @ApiProperty({ description: 'ID do funcionário dono deste dependente', format: 'uuid' })
  @Index()
  @Column('uuid')
  employee_id: string

  @ApiProperty({ example: 'FILHO', description: 'Parentesco' })
  @Column()
  relationship: string

  @ApiProperty({ type: () => EmployeeEntity })
  @ManyToOne(() => EmployeeEntity, (employee) => employee.dependents, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity


  @ApiProperty({
    description: 'Data e hora de criação do registro',
    example: '2024-01-15T10:30:00Z'
  })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @ApiProperty({
    description: 'Data e hora da última atualização do registro',
    example: '2024-01-20T14:45:00Z'
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @ApiProperty({
    description: 'Data e hora da exclusão do registro',
    example: '2024-01-20T14:45:00Z'
  })
  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date
}
