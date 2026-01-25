import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

@Entity('degree-kindship')
export class DegreeKindshipEntity {
  @ApiProperty({
    description: 'ID único do grau de parentesco',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  @IsString()
  description: string

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
