import { ICompany, IUser, ISped } from '../../models';

declare module 'knex/types/tables' {
	interface Tables {
		company: ICompany
		user: IUser
		sped: ISped
	}
}