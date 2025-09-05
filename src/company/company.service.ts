import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create.dto';
import { DeleteCompanyDto } from './dto/delete.dto';
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
            return this.manager.findOne(CompanyEntity, { where: { id } }) as Promise<CompanyEntity>;
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

    async edit(company: EditCompanyDto): Promise<CompanyEntity> {
        try {
            const userExists = await this.exists(company.id);
            if(!userExists) {
                throw new BadRequestException('Empresa não encontrado');
            }
            
            return this.manager.save(CompanyEntity, company);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(company: DeleteCompanyDto): Promise<string> {
        try {
            const userExists = await this.exists(company.id);
            if(!userExists) {
                throw new BadRequestException('Empresa não encontrada');
            }
        
        await this.manager.delete(CompanyEntity, company.id);

        return company.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
