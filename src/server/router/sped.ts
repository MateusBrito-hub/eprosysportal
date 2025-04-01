import { Router } from 'express';
import { SpedController } from '../controller';

const router = Router();

router.get('/',
	SpedController.getAllValidation,
	SpedController.getAll);
router.post('/',
	SpedController.createValidation,
	SpedController.create);
router.get('/:id',
	SpedController.getByIdValidation,
	SpedController.getById);
router.get('/status/:id',
	SpedController.getByCompanyIdValidation,
	SpedController.getByCompanyId);
router.delete('/:id',
	SpedController.deleteByIdValidation,
	SpedController.deteleById);
router.put('/:id',
	SpedController.updateByIdValidation,
	SpedController.updateById);

export { router };