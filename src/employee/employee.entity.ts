import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique, Index } from 'typeorm'
import { CompanyEntity } from '../company/company.entity'

@Entity('employees')
@Unique(['company_id', 'cpf']) // CPF único por empresa
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @Index()
  @Column('uuid')
  company_id: string

  @Column()
  full_name: string

  @Column()
  cpf: string

  @Column({ type: 'date', nullable: true })
  admission_date?: string

  @Column({ type: 'date', nullable: true })
  termination_date?: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
