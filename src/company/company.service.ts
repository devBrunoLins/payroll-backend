import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(@InjectEntityManager() private readonly manager: EntityManager){}


}
