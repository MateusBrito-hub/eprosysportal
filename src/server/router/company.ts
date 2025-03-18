import { Router } from 'express';
import { CompanyController} from '../controller';

const router = Router();

router.get('/', 
	CompanyController.getAllValidation,
	CompanyController.getAll);
router.post('/', 
	CompanyController.createValidation,
	CompanyController.create);
router.get('/:id', 
	CompanyController.getByIdValidation,
	CompanyController.getById);
router.delete('/:id', 
	CompanyController.deleteByIdValidation,
	CompanyController.deteleById);
router.put('/:id', 
	CompanyController.updateByIdValidation,
	CompanyController.updateById);

export {router};