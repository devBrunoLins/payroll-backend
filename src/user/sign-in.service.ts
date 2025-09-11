import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { compare } from 'bcrypt';
import { SigninDto } from './dto/sign-in.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class SignInService {

    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async signIn(userWithoutPsw: SigninDto) {
        try {
            const user = await this.userService.findByEmail(userWithoutPsw.email ?? '', 'RH_USER');

            if(!user) {
                throw new BadRequestException('Usuário não encontrado');
            }

            const isMatchPassword = await compare(userWithoutPsw.password, user.password_hash)

            if(!isMatchPassword) {
                throw new UnauthorizedException('E-mail ou senha incorretos');
            }
    
            const payload: ITokenPayload = {
                email: userWithoutPsw.email,
                name: user.name,
                company_id: user.company_id,
                id: user.id,
                need_reset_password: user.need_reset_password,
            };
        
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            });
        
            return { access_token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signInADM(userWithoutPsw: SigninDto) {
        try {
            const user = await this.userService.findByEmail(userWithoutPsw.email ?? '', 'ADM');

            if(!user) {
                throw new BadRequestException('Usuário não encontrado');
            }

            const isMatchPassword = await compare(userWithoutPsw.password, user.password_hash)

            if(!isMatchPassword) {
                throw new UnauthorizedException('E-mail ou senha incorretos');
            }
    
            const payload: ITokenPayload = {
                email: userWithoutPsw.email,
                name: user.name,
                company_id: user.company_id,
                id: user.id,
            };
        
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            });
        
            return { access_token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async recoveryPassword(body: RecoveryPasswordDto) {
        try {
            const recovery_password_token = uuidv4();
            return { recovery_password_token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
