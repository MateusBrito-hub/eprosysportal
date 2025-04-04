import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
	try {

		const hashedPassword = await bcrypt.hash(user.password, saltRounds);

		const [result] = await Knex(ETableNames.user)
			.insert({ ...user, password: hashedPassword })
			.returning('id');

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