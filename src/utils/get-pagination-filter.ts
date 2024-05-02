import { Request } from 'express';
import { FilterParams } from '../interfaces/interfaces';

export function getFilter(request: Request): FilterParams {
  const { limit, page } = request.query;
  let sort = request.query.sort;
  if (sort) {
    sort = decodeURIComponent(sort as string);
  }

  let pageNo = Number(page);
  if (pageNo < 1 || isNaN(pageNo)) {
    pageNo = 1;
  }

  let limitNo = Number(limit) || 10;
  if (limitNo < 1) {
    limitNo = 10;
  }

  return {
    limit: limitNo,
    page: pageNo,
    sort,
  } as FilterParams;
}
