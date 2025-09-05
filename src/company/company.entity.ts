import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Index, DeleteDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('companies')
export class CompanyEntity {
  @ApiProperty({
    description: 'ID único da empresa',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Ltda'
  })
  @Index({ unique: false })
  @Column()
  name: string

  @ApiProperty({
    description: 'Slug único da empresa para URLs amigáveis',
    example: 'tech-solutions',
    nullable: true
  })
  @Index({ unique: true })
  @Column({ nullable: true })
  slug?: string

  @ApiProperty({
    description: 'CNPJ da empresa no formato brasileiro',
    example: '12345678000190',
    nullable: true
  })
  @Column({ nullable: true })
  cnpj?: string

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
