import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICompany} from '../../models';

export const getById = async (id: number) : Promise<ICompany | Error> => {

	try {
		const result = await Knex(ETableNames.company)
			.select('*')
			.where('id', '=', id)
			.first();
		if (result) return result;
        
		return new Error('Erro ao consultar o registro');
	} catch (error) {
		console.log(error);
		return new Error('Erro ao consultar o registro');
	}
};