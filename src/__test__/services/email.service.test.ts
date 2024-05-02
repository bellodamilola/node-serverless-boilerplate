import EmailService from '../../services/email.service';
import config from '../../config';
import { EmailTemplate, GenericEmailTemplateType } from '../../interfaces/interfaces';

const sesInstance = {
    sendEmail: jest.fn().mockImplementation(() => {
        return {
          promise: jest.fn(),
        };
      })
};

jest.mock('aws-sdk', () => {
    return { SES: jest.fn(() => sesInstance) };
});

describe('should send email', () => {
    it('should send email based to toaddressess with subject and content', async () => {

        const senderEmail = "sender@gmail.com";
        config.ses.sender = senderEmail;
        const toEmailAddresses = ["test@gmail.com"];
        const emailType : any = {};
        await new EmailService().sendEmail(toEmailAddresses, EmailTemplate.BASIC, emailType as GenericEmailTemplateType);
        const params = {
            Source: senderEmail,
            Destination: {
                ToAddresses: toEmailAddresses
            },
            Message: {
                Body: {
                    Html:{
                        Charset: "UTF-8",
                        Data: "Dear user,<p>&nbsp;Your account has been created.</p><p>Regards,<br/>Admin</p>"
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Incoperate - Account creation succeeded"
                }
            }
        }
        expect(sesInstance.sendEmail).toBeCalledWith(params);
    });
});
