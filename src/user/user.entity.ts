import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, Index, Unique } from 'typeorm'
import { CompanyEntity } from '../company/company.entity'

@Entity('users')
@Unique(['company_id', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @Index()
  @Column('uuid')
  company_id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password_hash: string

  @Column({ default: 'RH_USER' })
  role: 'RH_ADMIN' | 'RH_USER' | string

  @Column({ default: true })
  is_active: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
