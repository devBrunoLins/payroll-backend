import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { EditEmployeeDto } from './dto/edit.dto';
import { CreateEmployeeDto } from './dto/create.dto';
import { DeleteEmployeeDto } from './dto/delete.dto';

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
            return this.manager.save(EmployeeEntity, user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(user: EditEmployeeDto): Promise<EmployeeEntity> {
        try {
            const userExists = await this.exists(user.id);
            if(!userExists) {
                throw new BadRequestException('Funcionário não encontrado');
            }
            
            return this.manager.save(EmployeeEntity, user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(employee: DeleteEmployeeDto): Promise<string> {
        try {
            const userExists = await this.exists(employee.id);
            if(!userExists) {
                throw new BadRequestException('Funcionário não encontrado');
            }
        
        await this.manager.delete(EmployeeEntity, employee.id);

        return employee.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
