export interface ISendMail {
    from: string
    to: string | string[]
    subject: string
    html: any
}