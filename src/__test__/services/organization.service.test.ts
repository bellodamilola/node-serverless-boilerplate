// import * as typeorm from 'typeorm';
// import {
//   FilterParams,
//   OrganizationInterface,
// } from '../../interfaces/interfaces';
// import { Organization } from '../../models/organization.model';
// import OrganizationService from '../../services/organization.service';
//
// jest.mock('../../services/organization-user.service.ts');
// jest.mock('../../services/cognito.service.ts');
//
// (typeorm as any).getRepository = jest.fn();
// const mockPromise = jest.fn();
//
// describe('Organization Service', () => {
//   let organizationData: Organization;
//   let orgData: OrganizationInterface;
//
//   const orgId = 'f57664d1-8b4c-4973-a1bf-0a79825da0bd';
//   const userId = 'f57664d1-8b4c-4973-a1bf-0a79825da0bd';
//
//   beforeEach(() => {
//     organizationData = {
//       id: orgId,
//       name: 'B Hospital',
//       address: 'Kingsway road',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       deletedAt: new Date(),
//       addId: () => {},
//     };
//
//     orgData = {
//       name: 'B Hospital',
//       address: 'Kingsway road',
//     };
//   });
//
//   it('should create an organization successfully', async () => {
//     const orgOnlyData = {
//       name: organizationData.name,
//       address: organizationData.address,
//     };
//     (typeorm as any).getRepository.mockReturnValue({
//       create: () => Promise.resolve(orgOnlyData),
//       save: () => Promise.resolve(organizationData),
//     });
//
//     const orgUser = {
//       user: userData,
//       organization: organizationData,
//       role: OrganizationUserRole.ADMIN,
//     };
//
//     const createOrgUserMock = jest.fn();
//     OrgUserService.prototype.createOrgUser = createOrgUserMock.mockReturnValue(
//       Promise.resolve(orgUser)
//     );
//
//     const result = await new OrganizationService().createOrg(orgData);
//     expect(result).toEqual(organizationData);
//     expect(createOrgUserMock).toBeCalledWith({
//       ...orgData.user,
//       organizationId: organizationData.id,
//     });
//   });
//
//   it('should throw client error when trying to get an organization that does not exist', async () => {
//     (typeorm as any).getRepository.mockReturnValue({
//       findOne: () => Promise.resolve(),
//     });
//
//     const invalidOrgError = {
//       message: 'Organization with given ID not found',
//       code: 'UnknownResource',
//     };
//     mockPromise.mockRejectedValueOnce(invalidOrgError);
//
//     const organization = new OrganizationService();
//
//     await expect(organization.getOrg(orgId)).rejects.toThrow(
//       'Organization with given ID not found'
//     );
//   });
//
//   it('should edit an organization successfully', async () => {
//     const orgOnlyData = {
//       name: organizationData.name,
//       address: organizationData.address,
//     };
//     (typeorm as any).getRepository.mockReturnValue({
//       merge: () => Promise.resolve(orgOnlyData),
//       save: () => Promise.resolve(organizationData),
//     });
//
//     OrganizationService.prototype.getOrg = jest
//       .fn()
//       .mockReturnValue(Promise.resolve(organizationData));
//
//     const result = await new OrganizationService().editOrg(orgData);
//     expect(result).toEqual(organizationData);
//   });
//
//   it('should delete an organization successfully', async () => {
//     (typeorm as any).getRepository.mockReturnValue({
//       softDelete: () => ({
//         organization: organizationData,
//       }),
//       find: () => ({
//         where: { organization: organizationData },
//         relations: ['user'],
//       }),
//     });
//
//     OrganizationService.prototype.getOrg = jest
//       .fn()
//       .mockReturnValue(Promise.resolve(organizationData));
//
//     CognitoService.prototype.disableUser = jest
//       .fn()
//       .mockReturnValue(Promise.resolve(userId));
//
//     const result = await new OrganizationService().deleteOrg(orgId);
//     expect(result).toEqual(organizationData);
//   });
//
//   it('should list all organizations successfully', async () => {
//     const organizations = [
//       {
//         organizations_id: '288b606b-16f4-4a55-808c-47c1bfc66a3e',
//         organizations_name: 'Test Organization one',
//         organizations_address: 'Address 1',
//         organizations_created_at: '2020-09-23T15:12:38.414Z',
//       },
//       {
//         organizations_id: '6583a2df-7c49-4c8d-a39d-930493080eb5',
//         organizations_name: 'Test Organization two',
//         organizations_address: 'Address 2',
//         organizations_created_at: '2020-09-23T15:12:57.383Z',
//       },
//       {
//         organizations_id: '321eefad-7585-4578-afa7-3965aa51577a',
//         organizations_name: 'Test Organization three',
//         organizations_address: 'Address 3',
//         organizations_created_at: '2020-09-23T15:13:36.383Z',
//       },
//     ];
//
//     const response = {
//       data: new OrganizationService().buildOrgList(organizations),
//       meta: {
//         total: 3,
//         page: 1,
//         limit: 10,
//       },
//     };
//
//     const filter = {
//       page: 1,
//       limit: 10,
//       sort: 'name:asc',
//     } as FilterParams;
//
//     (typeorm as any).getRepository.mockReturnValue({
//       createQueryBuilder: jest.fn().mockReturnValue({
//         select: jest.fn().mockReturnThis(),
//         skip: jest.fn().mockReturnThis(),
//         take: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         getRawMany: jest.fn().mockResolvedValue(organizations),
//         getCount: jest.fn().mockResolvedValue(3),
//       }),
//     });
//
//     const result = await new OrganizationService().listOrgs(filter);
//     expect(result).toMatchObject(response);
//   });
//
//   it('should list all organizations successfully if active members count is requested', async () => {
//     const organizations = [
//       {
//         id: '288b606b-16f4-4a55-808c-47c1bfc66a3e',
//         name: 'Test Organization one',
//         address: 'Address 1',
//         createdAt: '2020-09-23T15:12:38.414Z',
//         orgUsers: [
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'admin',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//         ],
//         activeMembers: 1,
//       },
//       {
//         id: '6583a2df-7c49-4c8d-a39d-930493080eb5',
//         name: 'Test Organization two',
//         address: 'Address 2',
//         createdAt: '2020-09-23T15:12:57.383Z',
//         orgUsers: [
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'admin',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'clinician',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//         ],
//         activeMembers: 2,
//       },
//       {
//         id: '321eefad-7585-4578-afa7-3965aa51577a',
//         name: 'Test Organization three',
//         address: 'Address 3',
//         createdAt: '2020-09-23T15:13:36.383Z',
//         orgUsers: [
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'admin',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'clinician',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//           {
//             id: 'f57664d1-8b4c-4973-a1bf-0a79825da0bd',
//             role: 'admin',
//             createdAt: '2020-09-23T18:22:17.220Z',
//             updatedAt: '2020-09-23T18:22:17.220Z',
//             deletedAt: null,
//           },
//         ],
//         activeMembers: 3,
//       },
//     ];
//
//     const response = {
//       data: organizations.map((org) => {
//         return {
//           ...org,
//           orgUsers: undefined,
//         };
//       }),
//       meta: {
//         total: 3,
//         page: 1,
//         limit: 10,
//       },
//     };
//
//     const filter = {
//       page: 1,
//       limit: 10,
//       sort: 'name:asc',
//     } as FilterParams;
//
//     const listOrgsMock = jest.fn();
//     OrganizationService.prototype.listOrgs = listOrgsMock.mockReturnValue(
//       Promise.resolve(response)
//     );
//     const result = await new OrganizationService().listOrgs(
//       filter,
//       undefined,
//       'yes'
//     );
//
//     expect(listOrgsMock).toBeCalled();
//     expect(listOrgsMock).toBeCalledTimes(1);
//     expect(listOrgsMock).toBeCalledWith(filter, undefined, 'yes');
//     expect(result).toMatchObject(response);
//   });
//
//   it('should list all organizations successfully if active members count is not requested', async () => {
//     const organizations = [
//       {
//         id: '288b606b-16f4-4a55-808c-47c1bfc66a3e',
//         name: 'Test Organization one',
//         address: 'Address 1',
//         createdAt: '2020-09-23T15:12:38.414Z',
//       },
//       {
//         id: '6583a2df-7c49-4c8d-a39d-930493080eb5',
//         name: 'Test Organization two',
//         address: 'Address 2',
//         createdAt: '2020-09-23T15:12:57.383Z',
//       },
//       {
//         id: '321eefad-7585-4578-afa7-3965aa51577a',
//         name: 'Test Organization three',
//         address: 'Address 3',
//         createdAt: '2020-09-23T15:13:36.383Z',
//       },
//     ];
//
//     const response = {
//       data: organizations,
//       meta: {
//         total: 3,
//         page: 1,
//         limit: 10,
//       },
//     };
//
//     const filter = {
//       page: 1,
//       limit: 10,
//       sort: 'name:asc',
//     } as FilterParams;
//
//     const listOrgsMock = jest.fn();
//     OrganizationService.prototype.listOrgs = listOrgsMock.mockReturnValue(
//       Promise.resolve(response)
//     );
//     const result = await new OrganizationService().listOrgs(
//       filter,
//       undefined,
//       'no'
//     );
//
//     expect(listOrgsMock).toBeCalled();
//     expect(listOrgsMock).toBeCalledTimes(1);
//     expect(listOrgsMock).toBeCalledWith(filter, undefined, 'no');
//     expect(result).toMatchObject(response);
//   });
//
//   it('should successfully return the organization(s) which matches search criteria', async () => {
//     const organizations = [
//       {
//         id: '288b606b-16f4-4a55-808c-47c1bfc66a3e',
//         name: 'Test Organization one',
//         createdAt: '2020-09-23T15:12:38.414Z',
//       },
//       {
//         id: '6583a2df-7c49-4c8d-a39d-930493080eb5',
//         name: 'Test Organization two',
//         createdAt: '2020-09-23T15:12:57.383Z',
//       },
//       {
//         id: '321eefad-7585-4578-afa7-3965aa51577a',
//         name: 'Test Organization three',
//         createdAt: '2020-09-23T15:13:36.383Z',
//       },
//     ];
//
//     const filter = {
//       page: 1,
//       limit: 5,
//       sort: 'name:asc',
//     } as FilterParams;
//
//     (typeorm as any).getRepository.mockReturnValue({
//       createQueryBuilder: jest.fn().mockReturnValue({
//         select: jest.fn().mockReturnThis(),
//         andWhere: jest.fn().mockReturnThis(),
//         skip: jest.fn().mockReturnThis(),
//         take: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         getManyAndCount: jest.fn().mockResolvedValue([organizations, 3]),
//       }),
//     });
//
//     const result = await new OrganizationService().listOrgs(filter, 'test');
//     expect(result.data).toMatchObject(organizations);
//   });
// });
