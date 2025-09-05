import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, Index, Unique, DeleteDateColumn } from 'typeorm'
import { CompanyEntity } from '../company/company.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
@Unique(['company_id', 'email'])
export class UserEntity {

  @ApiProperty({
    description: 'ID único do usuário',
    example: '550e8400-e29b-41d4-a716-446655441111',
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Dados da empresa na qual o usuário pertence',
    type: () => CompanyEntity
  })
  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @ApiProperty({
    description: 'ID da empresa na qual o usuário pertence',
    example: '550e8400-e29b-41d4-a716-446655441111',
    format: 'uuid'
  })
  @Index()
  @Column('uuid')
  company_id: string

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva Santos',
  })
  @Column()
  name: string

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com.br',
    format: 'email'
  })
  @Column()
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha123!',
    format: 'password'
  })
  @Column()
  password_hash: string

  @ApiProperty({
    description: 'Role do usuário',
    example: 'RH_ADMIN',
    enum: ['RH_ADMIN', 'RH_USER']
  })
  @Column({ default: 'RH_USER' })
  role: 'RH_ADMIN' | 'RH_USER' | string

  @ApiProperty({
    description: 'Status do usuário',
    example: true,
    default: true
  })
  @Column({ default: true })
  is_active: boolean

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
