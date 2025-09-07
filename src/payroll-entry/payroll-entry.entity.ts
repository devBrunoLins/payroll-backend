// payroll-entry.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, Index, CreateDateColumn, JoinColumn } from 'typeorm'
import { EmployeeEntity } from '@/employee/employee.entity'

@Entity('payroll_entries')
@Unique(['employee_id', 'period_month'])
export class PayrollEntryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  employee_id: string

  @ManyToOne(() => EmployeeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity

  @Column({ type: 'date' })
  @Index()
  period_month: string // 'YYYY-MM-01'

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  gross_amount?: string

  // NOVOS CAMPOS
  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0, nullable: false })
  commission_amount: string

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0, nullable: false })
  discount_amount: string

  // Opcional: valor líquido calculado no banco (Postgres 12+)
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    asExpression: 'COALESCE(gross_amount,0) + COALESCE(commission_amount,0) - COALESCE(discount_amount,0)',
    generatedType: 'STORED'
  })
  net_amount: string

  @Column({ type: 'text', nullable: true })
  notes?: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date
}
