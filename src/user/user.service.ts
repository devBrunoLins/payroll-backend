import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create.dto';
import { EditUserDto } from './dto/edit.dto';
import { hash } from 'bcrypt';
import { NotificationService } from '@/notification/notification.service';


@Injectable()
export class UserService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
        private readonly notificationService: NotificationService
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
            return await this.manager.find(UserEntity, { select: {
                id: true,
                name: true,
                email: true,
                role: true,
                is_active: true,
                need_reset_password: true,
                password_hash: false,
                company_id: true,
                company: false
            }});
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

    async findByEmail(email: string, role?: string): Promise<UserEntity> {
        try {
            if(role) {
                return this.manager.findOne(UserEntity, { where: { email, role } }) as Promise<UserEntity>;
            }

            return this.manager.findOne(UserEntity, { where: { email } }) as Promise<UserEntity>;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        try {
            const hashedPassword = await hash(user.password, 10);
            
            return this.manager.save(UserEntity, {
                ...user,
                password_hash: hashedPassword,
            });
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

    async resetPassword(id: string): Promise<boolean> {
        try {
            const user = await this.findById(id);

            if(!user) {
                throw new BadRequestException('Usuário não encontrado');
            }

            const hashedPassword = await hash(process.env.DEFAULT_PASSWORD, 10);

            await this.manager.update(UserEntity, id, {
                password_hash: hashedPassword,
                need_reset_password: true,
            });

            const html = await this.notificationService.renderTemplate('./src/emails/password-reset-notification.html', {
                user_name: user.name,
                user_email: user.email,
                new_password: process.env.DEFAULT_PASSWORD,
                reset_date: new Date().toLocaleDateString()
            })

            await this.notificationService.sendEmail({
                from: 'Sistema de Reset de Senha <noreply@consultingcontabil.com.br>',
                to: user.email,
                subject: 'Senha Resetada',
                html
            });

            return true;
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

    async findAllByCompanyId(company_id: string): Promise<UserEntity[]> {
        try {
            return this.manager.find(UserEntity, { where: { company_id } });
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }
}
