import { ICompany, IUser } from '../../models';

declare module 'knex/types/tables' {
	interface Tables {
		company: ICompany
		user: IUser
	}
}