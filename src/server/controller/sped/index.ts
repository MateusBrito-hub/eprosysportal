import * as create  from './Create';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as getByCompanyId from './GetByCompanyId';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';


export const SpedController = {
	...create,
	...getAll,
	...getById,
	...getByCompanyId,
	...UpdateById,
	...deleteById
};