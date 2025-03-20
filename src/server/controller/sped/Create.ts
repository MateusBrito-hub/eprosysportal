import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ISped } from '../../database/models';
import { SpedProvider } from '../../database/providers';

interface IBodyProps extends Omit<ISped, 'id'> { }

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		status: yup.string().required(),
		liberacao: yup.string().required(),
		envio: yup.string().required(),
		mes_referente: yup.string().required(),
		arquivos: yup.string().required(),
		empresa_id: yup.number().required(),
		suporte_id: yup.number().required()
	}))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) : Promise<void>=> {

	const result = await SpedProvider.create(req.body);

	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	res.status(StatusCodes.CREATED).json(result);
};