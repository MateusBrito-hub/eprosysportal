import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { SpedProvider } from '../../database/providers';

interface IParamsProps {
    id?: number,
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));

export const getById = async (req: Request<IParamsProps>, res: Response) : Promise<void> => {
    if(!req.params.id) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
    });

    const result = await SpedProvider.getById(Number(req.params.id));
    
    if (result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
		return
    }
    res.status(StatusCodes.OK).json(result);
};