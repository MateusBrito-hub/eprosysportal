import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UserProvider } from '../../database/providers'; 
import { generateToken } from '../../shared/services/genereterJWT'

interface IBodyProps {
	email: string;
	password: string;
}

export const loginValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required()
	}))
}));

export const login = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
	try {
		const result = await UserProvider.Auth(req.body.email, req.body.password);

		if (result instanceof Error) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				errors: {
					default: 'Credenciais inválidas'
				}
			});
			return;
		}

		const token = generateToken(result.id);

		res.status(StatusCodes.OK).json({
			message: 'Autenticação bem-sucedida',
			token
		});
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: 'Erro interno no servidor'
			}
		});
	}
};
