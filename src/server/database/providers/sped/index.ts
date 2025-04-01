import * as count from './Count';
import * as create  from './Create';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as getByCompanyId from './GetByCompanyId';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';

export const SpedProvider = {
	...count,
	...create,
	...getAll,
	...getById,
	...getByCompanyId,
	...UpdateById,
	...deleteById
};