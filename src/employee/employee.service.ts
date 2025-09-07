import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { EditEmployeeDto } from './dto/edit.dto';
import { CreateEmployeeDto } from './dto/create.dto';
import { CompanyEntity } from 'src/company/company.entity';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';
import { UserEntity } from '@/user/user.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
        @InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>
    ){}
    
    async exists(id: string, company_id: string): Promise<boolean> {
        try {
            return this.manager.exists(EmployeeEntity, { where: { id, company_id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findAll(company_id: string): Promise<EmployeeEntity[]> {
        try {
            return this.manager.find(EmployeeEntity, { where: { company_id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async listPendingForCurrentMonth(company_id: string): Promise<EmployeeEntity[]> {
        try {
            return this.employeeRepository
                .createQueryBuilder('e')
                .where('e.company_id = :company_id', { company_id })
                .andWhere(`
                    NOT EXISTS (
                        SELECT 1
                        FROM payroll_entries p
                        WHERE p.employee_id = e.id
                        AND p.period_month = date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date
                    )
                `)
                .orderBy('e.full_name', 'ASC')
                .getMany()
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findByCompanyId(company_id: string): Promise<EmployeeEntity[]> {
        try {
            return this.manager.find(EmployeeEntity, {
                where: { company_id }
            });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findById(id: string, company_id: string): Promise<EmployeeEntity> {
        try {
            return this.manager.findOne(EmployeeEntity, { where: { id, company_id } }) as Promise<EmployeeEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(employee: CreateEmployeeDto, userLogged: ITokenPayload): Promise<EmployeeEntity> {
        try {

            const [companyExists, userExists, employeeExists] = await Promise.all([
                this.manager.findOne(CompanyEntity, { where: { id: userLogged.company_id } }),
                this.manager.findOne(UserEntity, { where: { email: userLogged.email } }),
                this.manager.findOne(EmployeeEntity, { where: { cpf: employee.cpf, company_id: userLogged.company_id } })
            ])

            if(employeeExists) {
                throw new BadRequestException('Funcionário já cadastrado');
            }

            if(userExists && userExists.company_id !== userLogged.company_id){
                throw new ForbiddenException('Operação não permitida');
            }

            if(!companyExists) {
                throw new BadRequestException('Empresa não encontrada');
            }

            return this.manager.save(EmployeeEntity, {
                full_name: employee.full_name,
                cpf: employee.cpf,
                admission_date: employee.admission_date,
                salary: +employee.salary,
                company_id: userLogged.company_id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(employee: EditEmployeeDto, id: string, company_id: string): Promise<string> {
        try {
            const alreadyExists = await this.findById(id, company_id);
            
            if(!alreadyExists) {
                throw new BadRequestException('Funcionário não encontrado');
            }
            
            await this.manager.update(EmployeeEntity, id, {
                ...employee,
                id,
                updated_at: new Date(),
                created_at: alreadyExists.created_at
            });

            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: string, company_id: string): Promise<string> {
        try {
            const exists = await this.exists(id, company_id);
            if(!exists) {
                throw new BadRequestException('Funcionário não encontrado');
            }
        
            await this.manager.softDelete(EmployeeEntity, id);
            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
