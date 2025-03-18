import { ICompany } from '../../models';

declare module 'knex/types/tables' {
	interface Tables {
		company: ICompany
	}
}