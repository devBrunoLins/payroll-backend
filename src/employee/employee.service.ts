import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { EditEmployeeDto } from './dto/edit.dto';
import { CreateEmployeeDto } from './dto/create.dto';
import { CompanyEntity } from 'src/company/company.entity';

@Injectable()
export class EmployeeService {
    constructor(@InjectEntityManager() private readonly manager: EntityManager){}
    
    async exists(id: string): Promise<boolean> {
        try {
            return this.manager.exists(EmployeeEntity, { where: { id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findAll(): Promise<EmployeeEntity[]> {
        try {
            return this.manager.find(EmployeeEntity);
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

    async findById(id: string): Promise<EmployeeEntity> {
        try {
            return this.manager.findOne(EmployeeEntity, { where: { id } }) as Promise<EmployeeEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(user: CreateEmployeeDto): Promise<EmployeeEntity> {
        try {

            const companyExists = await this.manager.exists(CompanyEntity, { where: { id: user.company_id } });

            if(!companyExists) {
                throw new BadRequestException('Empresa não encontrada');
            }

            // if (currentCompanyId && companyId !== currentCompanyId) {
            //     throw new ForbiddenException('Operação não permitida para esta empresa')
            // }

            return this.manager.save(EmployeeEntity, user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(employee: EditEmployeeDto, id: string): Promise<string> {
        try {
            const alreadyExists = await this.findById(id);
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

    async delete(id: string): Promise<string> {
        try {
            const exists = await this.exists(id);
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
