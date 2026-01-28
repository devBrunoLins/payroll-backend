import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CheckResult, ITimedResponse } from './interface/health.interface';
@Injectable()
export class HealthService {

    constructor(
        private readonly _dataSource: DataSource
    ) {}

    private async _timed<T>(fn: () => Promise<T>): Promise<ITimedResponse> {
        const start = process.hrtime.bigint()
        try {
          await fn()
          const end = process.hrtime.bigint()
          return { ms: Number(end - start) / 1_000_000, ok: true }
        } catch (error) {
          const end = process.hrtime.bigint()
          return { ms: Number(end - start) / 1_000_000, ok: false, error }
        }
    }

    async check() {
        const totalStart = process.hrtime.bigint()
    
        const apiCheck: CheckResult = { status: 'up', ms: 0 }
    
        const dbTimed = await this._timed(async () => {
          // SELECT 1 é o ping mais comum e barato
          await this._dataSource.query('SELECT 1')
        })
    
        const dbCheck: CheckResult = dbTimed.ok
          ? { status: 'up', ms: dbTimed.ms }
          : { status: 'down', ms: dbTimed.ms, error: (dbTimed.error as any)?.message ?? 'DB check failed' }
    
        const totalEnd = process.hrtime.bigint()
        const totalMs = Number(totalEnd - totalStart) / 1_000_000
    
        const overallStatus = apiCheck.status === 'up' && dbCheck.status === 'up' ? 'ok' : 'error'
    
        return {
          status: overallStatus,
          timestamp: new Date().toISOString(),
          totalMs: Number(totalMs.toFixed(2)),
          checks: {
            api: { ...apiCheck, ms: Number(apiCheck.ms.toFixed(2)) },
            db: { ...dbCheck, ms: Number(dbCheck.ms.toFixed(2)) }
          }
        }
    }
}
