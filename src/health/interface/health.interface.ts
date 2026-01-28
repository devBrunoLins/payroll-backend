export interface ITimedResponse {
    ms: number;
    ok: boolean;
    error?: unknown;
}


export type CheckResult = { status: 'up' | 'down'; ms: number; error?: string }