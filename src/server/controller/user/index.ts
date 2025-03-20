import * as create  from './Create';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as UpdateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as auth from './Auth';


export const UserController = {
	...auth,
	...create,
	...getAll,
	...getById,
	...UpdateById,
	...deleteById
};