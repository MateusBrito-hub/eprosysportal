import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISped } from '../../models';

export const updateById = async (id: number, sped: Omit<ISped, 'id'>): Promise<void | Error> => {
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
		if (countUser === 0) {
			return new Error('O Suporte usada não foi cadastrada');
		}

		const result = await Knex(ETableNames.sped)
			.update(sped)
			.where('id', '=', id);
		if (result > 0) return;
		return new Error('Erro ao atualizar o registro');
	} catch (error) {
		console.log(error);
		return new Error('Erro ao atualizar o registro');
	}
};