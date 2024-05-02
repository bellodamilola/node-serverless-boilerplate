import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { celebrate } from 'celebrate';

import { OrganizationInterface } from '../../interfaces/interfaces';
import OrganizationService from '../../services/organization.service';
import { validateJwtToken } from '../../middleware/validate-jwt-token';
import { checkBrandUser } from '../../middleware/authorizer';
import { createOrgSchema } from '../../utils/validation-schema';

const organizationRoutes: Router = Router();

organizationRoutes.post(
  '/',
  validateJwtToken,
  checkBrandUser,
  celebrate({ body: createOrgSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const organizationInfo: OrganizationInterface = request.body;
    const data = await new OrganizationService().createOrg(organizationInfo);

    response.status(201).send(data);
  })
);

// organizationRoutes.put(
//   '/:orgId',
//   validateJwtToken,
//   checkBrandUser,
//   celebrate(editOrgSchema),
//   asyncHandler(async (request: Request, response: Response) => {
//     const organizationInfo: OrganizationInterface = {
//       id: request.params.orgId,
//       ...request.body,
//     };
//     const data = await new OrganizationService().editOrg(organizationInfo);
//
//     response.status(200).send(data);
//   })
// );
//
// organizationRoutes.delete(
//   '/:orgId',
//   validateJwtToken,
//   checkBrandUser,
//   celebrate({ params: orgIdParamSchema }),
//   asyncHandler(async (request: Request, response: Response) => {
//     const data = await new OrganizationService().deleteOrg(
//       request.params.orgId
//     );
//
//     response.status(200).send(data);
//   })
// );
//
// organizationRoutes.get(
//   '/',
//   validateJwtToken,
//   checkBrandUser,
//   celebrate({ query: listOrgSchema }),
//   asyncHandler(async (request: Request, response: Response) => {
//     const filter = getFilter(request);
//     const search = request.query.search as string;
//     const activeMemberCount = request.query['active-member-count'] as string;
//     const data = await new OrganizationService().listOrgs(
//       filter,
//       search,
//       activeMemberCount
//     );
//
//     response.status(200).json(data);
//   })
// );

export { organizationRoutes };
