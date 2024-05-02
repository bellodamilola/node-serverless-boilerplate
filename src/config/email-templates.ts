import { BasicEmailTemplateType, EmailTemplate, GenericEmailTemplateType } from "../interfaces/interfaces";

const buildSimpleEmailBody = (options: BasicEmailTemplateType) => {
  return `Dear user,<p>&nbsp;Welcome to the platform(${options.reportId}) on ${options.dateTime}</p><p>Regards,<br/>Admin</p>`;
};

const getEmailTemplate = (template: EmailTemplate, type: GenericEmailTemplateType) => {
  const templates = {
    [EmailTemplate.BASIC]: {
      subject: "Incoperate - User noticeable action",
      content: buildSimpleEmailBody(type as BasicEmailTemplateType)
    }
  };
  return templates[template];
};

export { getEmailTemplate };
