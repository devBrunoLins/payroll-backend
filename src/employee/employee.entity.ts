import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique, Index, DeleteDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../company/company.entity'

@Entity('employees')
@Unique(['company_id', 'cpf']) // CPF único por empresa
export class EmployeeEntity {
  @ApiProperty({
    description: 'ID único do funcionário',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Dados da empresa vinculada ao funcionário',
    type: () => CompanyEntity
  })
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @ApiProperty({
    description: 'ID da empresa à qual o funcionário pertence',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @Index()
  @Column('uuid')
  company_id: string

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João Silva Santos'
  })
  @Column()
  full_name: string

  @ApiProperty({
    description: 'CPF do funcionário no formato brasileiro',
    example: '123.456.789-00'
  })
  @Column()
  cpf: string

  @ApiProperty({
    description: 'Data de admissão do funcionário na empresa',
    example: '2024-01-15',
    format: 'date',
    nullable: true
  })
  @Column({ type: 'date', nullable: true })
  admission_date?: string

  @ApiProperty({
    description: 'Data de demissão do funcionário da empresa',
    example: '2024-12-31',
    format: 'date',
    nullable: true
  })
  @Column({ type: 'date', nullable: true })
  termination_date?: string

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
