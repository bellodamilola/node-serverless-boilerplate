// import { OrganizationUserRole } from '../models/organization-user.model';
// import { Gender } from '../models/patient.model';
// import { ContactStatus, ReportHighLight, VisibleStatus } from '../models/report.model';
// import { UserStatus } from '../models/user.model';

export type CognitoUserRole = 'clinician' | 'admin' | 'super_admin' | 'patient';

export type BasicEmailTemplateType = {
  reportId: string,
  dateTime: Date
};

export type ReportFailureEmailTemplateType = {
  reportId: string,
  dateTime: Date
};

export type ReportVisibleEmailTemplateType = {
  clinicianName: string,
};

export type InfectPushTemplateType = {
  reportId: string
};

export type ReportPushTemplateType = {
  reportId: string
};

export type PushNotificationParams = {
  title: string
  body: string
  locKey?: string
  additionalParams?: any
};

export type GenericEmailTemplateType = ReportVisibleEmailTemplateType |
  BasicEmailTemplateType | ReportFailureEmailTemplateType;
export type GenericPushTemplateType = InfectPushTemplateType | ReportPushTemplateType;

export enum UserRole {
  ImpactPartner = 'impact_partner',
  Supporter = 'supporter',
  Brand = 'brand',
  Creator = 'creator',
}

export enum EmailTemplate {
   BASIC = 'basic'
}

export interface OrganizationInterface {
  id?: string;
  name: string;
  address: string;
}

export interface FilterParams {
  limit: number;
  page: number;
  sort: string;
}
