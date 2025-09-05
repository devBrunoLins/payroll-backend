import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
        private jwtService: JwtService,
    ){}

    async exists(id: string): Promise<boolean> {
        try {
            return this.manager.exists(UserEntity, { where: { id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        try {
            return this.manager.find(UserEntity);
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async findById(id: string): Promise<UserEntity> {
        try {
            return this.manager.findOne(UserEntity, { where: { id } }) as Promise<UserEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            return this.manager.findOne(UserEntity, { where: { email } }) as Promise<UserEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        try {
            return this.manager.save(UserEntity, user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async edit(user: EditUserDto): Promise<UserEntity> {
        try {
            const userExists = await this.exists(user.id);
            if(!userExists) {
                throw new BadRequestException('Usuário não encontrado');
            }
            
            return this.manager.save(UserEntity, user);
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async delete(user: EditUserDto): Promise<string> {
        try {
            const userExists = await this.exists(user.id);
            if(!userExists) {
                throw new BadRequestException('Usuário não encontrado');
            }
        
        await this.manager.delete(UserEntity, user.id);

        return user.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signIn(userWithoutPsw: SigninDto) {
        try {
            const user = await this.findByEmail(userWithoutPsw.email ?? '');

            if(!user) {
                throw new BadRequestException('Usuário não encontrado');
            }

            const isMatchPassword = await compare(userWithoutPsw.password, user.password_hash)

            if(!isMatchPassword) {
                throw new UnauthorizedException('Usuário ou senha incorretos');
            }
    
            const payload = {
                email: userWithoutPsw.email,
                name: user.name,
                company_id: user.company_id,
                id: user.id,
            };
        
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            });
        
            return {
            access_token
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
