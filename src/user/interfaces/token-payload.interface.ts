export interface ITokenPayload {
    email: string;
    name: string;
    company_id: string;
    id: string;
    need_reset_password?: boolean;
}