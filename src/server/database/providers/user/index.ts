import * as count from './Count';
import * as create  from './Create';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as auth from './Auth';

export const UserProvider = {
	...auth,
	...count,
	...create,
	...getAll,
	...getById,
	...UpdateById,
	...deleteById
};