
import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { UserProvider } from '../../database/providers';

interface IParamsProps {
	id?: number,
}
interface IBodyProps extends Omit<IUser, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required(),
		cpf: yup.string().required(),
		email: yup.string().required(),
		password: yup.string().required(),
		user_type: yup.number().required(),
		contato: yup.string().required()
	})),
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0)
	}))
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response): Promise<void> => {
	if (!req.params.id) res.status(StatusCodes.BAD_REQUEST).json({
		errors: {
			default: 'O parâmetro "id" precisa ser informado'
		}
	});

	const result = await UserProvider.updateById(Number(req.params.id), req.body);
	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	res.status(StatusCodes.NO_CONTENT).send();
};