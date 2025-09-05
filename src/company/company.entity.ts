import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm'

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: false })
  @Column()
  name: string

  @Index({ unique: true })
  @Column({ nullable: true })
  slug?: string

  @Column({ nullable: true })
  cnpj?: string

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date
}
