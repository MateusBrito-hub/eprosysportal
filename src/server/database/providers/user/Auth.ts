import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';
import bcrypt from 'bcrypt';

export const Auth = async (email: string, password: string): Promise<IUser | Error> => {
	try {
		const result = await Knex(ETableNames.user)
			.select('*')
			.where('email', '=', email)
			.first();

		if (result) {
			const isPasswordValid = await bcrypt.compare(password, result.password);

			if (isPasswordValid) {
				return result;
			} else {
				return new Error('Senha inválida');
			}
		}

		return new Error('Usuário não encontrado');
	} catch (err) {
		console.log(err);
		return new Error('Erro ao consultar o registro');
	}
};
