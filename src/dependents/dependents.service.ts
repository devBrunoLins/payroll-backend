import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { DependentsEntity } from './dependents.entity';
import { EditDependentsDto } from './dto/edit.dto';
import { CreateDependentsDto } from './dto/create.dto';
import { CompanyEntity } from 'src/company/company.entity';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';
import { UserEntity } from '@/user/user.entity';
import { EmployeeEntity } from '@/employee/employee.entity';

@Injectable()
export class DependentsService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
        @InjectRepository(DependentsEntity) private readonly dependentsRepository: Repository<DependentsEntity>
    ){}
    
    async exists(id: string, employee_id: string): Promise<boolean> {
        try {
            return this.manager.exists(DependentsEntity, { where: { id, employee_id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findAll(employee_id: string): Promise<DependentsEntity[]> {
        try {
            return this.manager.find(DependentsEntity, { where: { employee_id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async listPendingForCurrentMonth(employee_id: string): Promise<DependentsEntity[]> {
        try {
            return this.dependentsRepository
                .createQueryBuilder('e')
                .where('e.employee_id = :employee_id', { employee_id })
                // .andWhere(`
                //     NOT EXISTS (
                //         SELECT 1
                //         FROM payroll_entries p
                //         WHERE p.dependent_id = e.id
                //         AND p.period_month = date_trunc('month', (now() AT TIME ZONE 'America/Sao_Paulo'))::date
                //     )
                // `)
                .orderBy('e.full_name', 'ASC')
                .getMany()
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findByCompanyId(employee_id: string): Promise<DependentsEntity[]> {
        try {
            return this.manager.find(DependentsEntity, {
                where: { employee_id }
            });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findById(id: string, employee_id: string): Promise<DependentsEntity> {
        try {
            return this.manager.findOne(DependentsEntity, { where: { id, employee_id } }) as Promise<DependentsEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dependent: CreateDependentsDto, userLogged: ITokenPayload): Promise<DependentsEntity> {
        try {

            const [dependentExists] = await Promise.all([
                this.manager.findOne(DependentsEntity, { where: { id: dependent.employee_id } }),
            ])

            if(!dependentExists) {
                throw new ForbiddenException('Operação não permitida');
            }

            return this.manager.save(DependentsEntity, dependent);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(dependent: EditDependentsDto, id: string, employee_id: string): Promise<string> {
        try {
            const alreadyExists = await this.findById(id, employee_id);
            
            if(!alreadyExists) {
                throw new BadRequestException('Dependente não encontrado');
            }
            
            await this.manager.update(DependentsEntity, id, dependent);

            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id: string, employee_id: string): Promise<string> {
        try {
            const exists = await this.exists(id, employee_id);
            if(!exists) {
                throw new BadRequestException('Dependente não encontrado');
            }
        
            await this.manager.softDelete(DependentsEntity, id);
            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
