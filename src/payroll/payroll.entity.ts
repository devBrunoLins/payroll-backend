import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, Index } from 'typeorm'
import { EmployeeEntity } from '../employee/employee.entity'

@Entity('payrolls')
@Unique(['employee_id', 'competence_year', 'competence_month'])
export class PayrollEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => EmployeeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity

  @Index()
  @Column('uuid')
  employee_id: string

  @Column('int')
  competence_year: number

  @Column('int')
  competence_month: number

  // numeric vira string no TypeORM por precisão
  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discount_amount: string

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  commission_amount: string

  @Column({ type: 'text', nullable: true })
  notes?: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
