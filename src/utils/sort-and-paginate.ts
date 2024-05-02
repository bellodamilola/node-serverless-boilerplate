import { FilterParams } from '../interfaces/interfaces';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

function paginateByFilter<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filter: FilterParams
) {
  return queryBuilder.skip((filter.page - 1) * filter.limit).take(filter.limit);
}

function sortByFilter<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filter: FilterParams,
  alias: string,
  defaultSortOrder = 'createdAt:desc'
) {
  const sortOrder = filter.sort || defaultSortOrder;
  const condition = sortOrder.split(':');
  const orderType = (condition[1].trim().toUpperCase() as unknown) as
    | 'ASC'
    | 'DESC';
  // https://github.com/typeorm/typeorm/issues/747#issuecomment-408100805
  return queryBuilder.orderBy(`${alias}.${condition[0]}`, orderType);
}

export function paginateForJoins<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filter: FilterParams
) {
  return queryBuilder
    .offset((filter.page - 1) * filter.limit)
    .limit(filter.limit);
}

export function sortAndPaginateForBuilder<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filter: FilterParams,
  alias: string,
  defaultSortOrder = 'createdAt:desc'
): SelectQueryBuilder<T> {
  const query = sortByFilter(queryBuilder, filter, alias, defaultSortOrder);
  return paginateByFilter(query, filter);
}
