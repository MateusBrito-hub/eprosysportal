import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISped } from '../../models';

export const getByCompanyId = async (id: number) : Promise<ISped | Error> => {

	try {
		const result = await Knex(ETableNames.sped)
			.select('*')
			.where('empresa_id', '=', id)
			.first();
		if (result) return result;
        
		return new Error('Erro ao consultar o registro');
	} catch (error) {
		console.log(error);
		return new Error('Erro ao consultar o registro');
	}
};