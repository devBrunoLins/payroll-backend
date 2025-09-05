import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectEntityManager() private readonly manager: EntityManager){}


    async findAll(): Promise<UserEntity[]> {
        return this.manager.find(UserEntity);
    }

    async findById(id: string): Promise<UserEntity> {
        return this.manager.findOne(UserEntity, { where: { id } }) as Promise<UserEntity>;
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        return this.manager.save(UserEntity, user);
    }
}
