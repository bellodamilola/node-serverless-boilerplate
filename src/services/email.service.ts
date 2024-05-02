import { SES } from 'aws-sdk';
import { format } from 'path';
import config from '../config';
import { getEmailTemplate } from '../config/email-templates';
import { EmailTemplate, GenericEmailTemplateType } from '../interfaces/interfaces';
export default class EmailService {
    async sendEmail(toEmails: string[], template: EmailTemplate, options: GenericEmailTemplateType) {
        const email = getEmailTemplate(template, options);
        const sesConfig = {
            apiVersion: config.ses.apiVersion,
            region: config.ses.region
        };
        const params = {
            Source: config.ses.sender,
            Destination: {
                ToAddresses: toEmails
            },
            Message: {
                Body: {
                    Html:{
                        Charset: "UTF-8",
                        Data: email.content
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: email.subject
                }
            }
        }
        await new SES(sesConfig).sendEmail(params).promise();
    }
}
