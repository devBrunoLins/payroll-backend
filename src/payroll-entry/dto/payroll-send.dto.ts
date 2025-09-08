

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PayrollEntry {
  @ApiProperty({
    description: 'ID único do funcionário',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  @IsNotEmpty({ message: 'ID do funcionário é obrigatório' })
  @IsUUID('4', { message: 'ID do funcionário deve ser um UUID válido' })
  @ApiProperty({
    description: 'ID único do funcionário',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  employee_id: string;

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João Silva Santos'
  })
  @IsNotEmpty({ message: 'Nome do funcionário é obrigatório' })
  @IsString({ message: 'Nome do funcionário deve ser uma string' })
  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João Silva Santos'
  })
  employee_name: string;

  @ApiProperty({
    description: 'Salário base do funcionário',
    example: 5000.00,
    format: 'number'
  })
  salary: number;

  @ApiProperty({
    description: 'Valor total de descontos aplicados',
    example: 250.00,
    format: 'number'
  })
  discount: number;

  @ApiProperty({
    description: 'Valor de comissões e bonificações',
    example: 150.00,
    format: 'number'
  })
  commission: number;

  @ApiProperty({
    description: 'Salário líquido (salário + comissão - desconto)',
    example: 4900.00,
    format: 'number'
  })
  netSalary: number;

  @ApiProperty({
    description: 'Observações sobre a folha de pagamento do funcionário',
    example: 'Desconto por atraso aplicado',
    required: false
  })
  observations: string;
}

export class PayrollSummary {
  @ApiProperty({
    description: 'Número total de funcionários na folha',
    example: 25,
    format: 'number'
  })
  totalEmployees: number;

  @ApiProperty({
    description: 'Soma total de todos os salários base',
    example: 125000.00,
    format: 'number'
  })
  totalSalaries: number;

  @ApiProperty({
    description: 'Soma total de todos os descontos',
    example: 6250.00,
    format: 'number'
  })
  totalDiscounts: number;

  @ApiProperty({
    description: 'Soma total de todas as comissões',
    example: 3750.00,
    format: 'number'
  })
  totalCommissions: number;

  @ApiProperty({
    description: 'Total líquido da folha de pagamento',
    example: 122500.00,
    format: 'number'
  })
  totalNet: number;
}

export class PayrollSendDto {
  @ApiProperty({
    description: 'Mês de referência da folha de pagamento',
    example: '2024-01',
    format: 'YYYY-MM'
  })
  month: string;

  @ApiProperty({
    description: 'Ano de referência da folha de pagamento',
    example: 2024,
    format: 'number'
  })
  year: number;

  @ApiProperty({
    description: 'Lista de entradas da folha de pagamento por funcionário',
    type: [PayrollEntry],
    isArray: true
  })
  entries: PayrollEntry[];

  @ApiProperty({
    description: 'Resumo consolidado da folha de pagamento',
    type: PayrollSummary
  })
  summary: PayrollSummary;
}