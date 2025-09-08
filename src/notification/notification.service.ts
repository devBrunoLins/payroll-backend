import { PayrollSendDto } from '@/payroll-entry/dto/payroll-send.dto';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import Handlebars from 'handlebars'
import { ISendMail } from './interfaces/send-mail.interface';

@Injectable()
export class NotificationService {
    private resend: Resend;

    constructor(){
        this.resend = new Resend(process.env.RESEND_API_KEY);
        
        // Registrar helper para formatação de moeda
        Handlebars.registerHelper('formatCurrency', function(value) {
            return new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        });
    }

    async renderTemplate(filePath: string, variables: any): Promise<string> {
        try {
            const absolute = resolve(filePath)
            const data = await readFile(absolute, 'utf8')
            const template = Handlebars.compile(data)
            return template(variables)
        } catch (error) {
            console.error('Error rendering template:', error)
            throw error
        }
    }

    async sendEmail(data: ISendMail) {

        const { from, to, subject, html } = data
        const { data: emailResponse, error } = await this.resend.emails.send({
            from,
            to,
            subject,
            html,
        });

        return { data: emailResponse, error }
    }
}
