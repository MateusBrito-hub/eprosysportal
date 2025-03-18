import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ICompany } from '../../database/models';
import { CompanyProvider } from '../../database/providers/company';

interface IBodyProps extends Omit<ICompany, 'id'> { }

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required(),
		razao_social: yup.string().required(),
		cnpj: yup.string().required(),
		email: yup.string().required(),
		tipo_banco: yup.string().required(),
		responsavel: yup.string().required()
	}))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) : Promise<void>=> {

	const result = await CompanyProvider.create(req.body);

	if (result instanceof Error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	res.status(StatusCodes.CREATED).json(result);
};