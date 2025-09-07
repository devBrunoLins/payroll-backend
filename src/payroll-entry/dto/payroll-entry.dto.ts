import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class PayrollEntryGenerateDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @ApiProperty({
        description: 'ID do funcionário',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    employee_id: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Desconto',
        example: '100.00',
        format: 'string'
    })
    @Min(0, { message: 'Desconto deve ser maior ou igual a 0' })
    discount: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Salário',
        example: '100.00',
        format: 'string'
    })
    salary: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Comissão',
        example: '100.00',
        format: 'string'
    })
    @Min(0, { message: 'Comissão deve ser maior ou igual a 0' })
    commission: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Observações',
        example: 'Observações',
    })
    notes: string
}