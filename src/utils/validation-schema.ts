import { Joi } from 'celebrate';

export const createOrgSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

