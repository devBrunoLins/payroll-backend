import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create.dto';
import { EditCompanyDto } from './dto/edit.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectEntityManager() private readonly manager: EntityManager){}

    async exists(id: string): Promise<boolean> {
        try {
            return this.manager.exists(CompanyEntity, { where: { id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findAll(): Promise<CompanyEntity[]> {
        try {
            return this.manager.find(CompanyEntity);
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findById(id: string): Promise<CompanyEntity> {
        try {
            const company = await this.manager.findOne(CompanyEntity, { where: { id } });
            if(!company) {
                throw new BadRequestException('Empresa não encontrada');
            }

            return company;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(company: CreateCompanyDto): Promise<CompanyEntity> {
        try {
            return this.manager.save(CompanyEntity, company);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(company: EditCompanyDto, id: string): Promise<string> {
        try {
            const alreadyExists = await this.findById(id);
            if(!alreadyExists) {
                throw new BadRequestException('Empresa não encontrado');
            }
            
            await this.manager.update(CompanyEntity, id, {
                ...company,
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
            const userExists = await this.exists(id);
            if(!userExists) {
                throw new BadRequestException('Empresa não encontrada');
            }
        
            await this.manager.softDelete(CompanyEntity, id);
            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
