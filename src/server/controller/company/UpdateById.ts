
import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICompany } from '../../database/models';
import { CompanyProvider } from '../../database/providers/company';

interface IParamsProps {
	id?: number,
}
interface IBodyProps extends Omit<ICompany, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required(),
		razao_social: yup.string().required(),
		cnpj: yup.string().required(),
		email: yup.string().required(),
		tipo_banco: yup.string().required(),
		responsavel: yup.string().required()
	})),
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0)
	}))
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) : Promise<void>=> {
	if (!req.params.id) res.status(StatusCodes.BAD_REQUEST).json({
		errors: {
			default: 'O parâmetro "id" precisa ser informado'
		}
	});

	const result = await CompanyProvider.updateById(Number(req.params.id), req.body);
	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	res.status(StatusCodes.NO_CONTENT).send();
};