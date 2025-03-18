import { Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { CompanyProvider } from '../../database/providers/company';

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}));

export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) : Promise<void>=> {
    const result = await CompanyProvider.getAll(req.query.page || 1, req.query.limit || 200, req.query.filter || '');
    const count = await CompanyProvider.count(req.query.filter);

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: result.message}
        });
    } else if (count instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: count.message}
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count.toString());

    res.status(StatusCodes.OK).json(result);
};