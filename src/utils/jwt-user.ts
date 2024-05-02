import { get } from 'lodash';
import { UserRole } from '../interfaces/interfaces';

export class JWTUser {
  readonly id: string;
  private userRole: UserRole;

  constructor(details: any) {
    this.id = details.sub;
    this.userRole = get(details, 'cognito:groups.0');
  }

  isBrand(): boolean {
    return this.userRole.toLowerCase() === UserRole.Brand;
  }

  isSupporter(): boolean {
    return this.userRole.toLowerCase() === UserRole.Supporter;
  }

  isImpactPartner(): boolean {
    return this.userRole.toLowerCase() === UserRole.ImpactPartner;
  }

  isCreator(): boolean {
    return this.userRole.toLowerCase() === UserRole.Creator;
  }
}
