import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PayrollEntryService } from './payroll-entry.service';
import { PayrollEntryGenerateDto } from './dto/payroll-entry.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt/jwt-auth.guard';

@ApiTags('Geração de lançamentos de folha	')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('payroll-entry')
export class PayrollEntryController {
  constructor(private readonly payrollEntryService: PayrollEntryService) {}

  @Post('generate')
  async createForCurrentMonth(@Body() body: PayrollEntryGenerateDto) {
    return this.payrollEntryService.createForCurrentMonth(body);
  }
}
