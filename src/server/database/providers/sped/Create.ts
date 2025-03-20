import { ETableNames } from '../../ETableNames';
import { ISped } from '../../models';
import { Knex } from '../../knex';

export const create = async (sped: Omit<ISped, 'id'>): Promise<number | Error> => {
	try {

		const [{ countCompany }] = await Knex(ETableNames.company)
			.where('id', 'like', sped.empresa_id)
			.count<[{ countCompany: number }]>('* as count');
		if (countCompany === 0) {
			return new Error('A empresa usada não foi cadastrada');
		}

		const [{ countUser }] = await Knex(ETableNames.user)
			.where('id', 'like', sped.suporte_id)
			.count<[{ countUser: number }]>('* as count');

		const [result] = await Knex(ETableNames.sped).insert(sped).returning('id');
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