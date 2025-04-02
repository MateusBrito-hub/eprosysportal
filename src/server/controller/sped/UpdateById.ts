
import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ISped } from '../../database/models';
import { SpedProvider } from '../../database/providers';

interface IParamsProps {
	id?: number,
}
interface IBodyProps extends Omit<ISped, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		status: yup.string().required(),
		liberacao: yup.string().required(),
		envio: yup.string().required(),
		mes_referente: yup.string().required(),
		arquivos: yup.string().required(),
		empresa_id: yup.number().required(),
		suporte_id: yup.number().required()
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

	const result = await SpedProvider.updateById(Number(req.params.id), req.body);
	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
		return;
	}

	res.status(StatusCodes.NO_CONTENT).send();
};