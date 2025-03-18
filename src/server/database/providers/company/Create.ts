import { ETableNames } from '../../ETableNames';
import { ICompany } from '../../models';
import { Knex } from '../../knex';

export const create = async (company: Omit<ICompany, 'id'>): Promise<number | Error> => {
	try {
		const [result] = await Knex(ETableNames.company).insert(company).returning('id');
		if (typeof result === 'object') {
			return result.id;
		} else if (typeof result === 'number') {
			return result;
		}
		return new Error('Error saving record');
	} catch (err) {
		return new Error('Error saving record');
	}
};