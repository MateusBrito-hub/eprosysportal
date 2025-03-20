import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IUser } from '../../database/models';
import { UserProvider } from '../../database/providers';

interface IBodyProps extends Omit<IUser, 'id'> { }

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required(),
		cpf: yup.string().required(),
		email: yup.string().required(),
		password: yup.string().required(),
		user_type: yup.number().required(),
		contato: yup.string().required()
	}))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) : Promise<void>=> {

	const result = await UserProvider.create(req.body);

	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	res.status(StatusCodes.CREATED).json(result);
};