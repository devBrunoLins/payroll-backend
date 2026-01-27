import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DependentsEntity } from './dependents.entity';
import { EditDependentsDto } from './dto/edit.dto';
import { CreateDependentsDto } from './dto/create.dto';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';
import { DegreeKindshipEntity } from './degree-kindship.entity';

@Injectable()
export class DependentsService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager
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

    async findAllDegreeKindship(): Promise<DegreeKindshipEntity[]> {
        try {
            return this.manager.find(DegreeKindshipEntity);
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

            if(dependentExists) {
                throw new ForbiddenException('Operação não permitida');
            }

            return this.manager.save(DependentsEntity, dependent);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(dependent: EditDependentsDto, id: string): Promise<string> {
        try {
            const alreadyExists = await this.findById(id, dependent.employee_id);
            
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
