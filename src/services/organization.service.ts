import { Organization } from '../models/organization.model';
import { OrganizationInterface } from '../interfaces/interfaces';
import logger from '../logger';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from '../constants';
import { badRequestError } from '../error';
import { AppDataSource } from '../ormconfig';

export default class OrganizationService {
  private orgRepo = AppDataSource.getRepository(Organization);

  async createOrg(
    organizationData: OrganizationInterface
  ): Promise<Organization> {
    let organization = this.orgRepo.create(organizationData);
    organization = await this.safeSaveOrganization(organization);

    return organization;
  }

  async safeSaveOrganization(
    organization: Organization
  ): Promise<Organization> {
    try {
      return await this.orgRepo.save(organization);
    } catch (err) {
      // @ts-ignore
      if (err && err.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw badRequestError('Organization name was already taken');
      } else {
        logger.error('System Error while saving Organization');
        throw err;
      }
    }
  }
}
