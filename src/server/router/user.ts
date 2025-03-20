import { Router } from 'express';
import { UserController  } from '../controller';

const router = Router();

router.get('/',
	UserController.getAllValidation,
	UserController.getAll
)
router.get('/:id',
	UserController.getByIdValidation,
	UserController.getById
)
router.delete('/:id',
	UserController.deleteByIdValidation,
	UserController.deteleById
)
router.put('/:id',
	UserController.updateByIdValidation,
	UserController.updateById
)
router.post('/login', 
	UserController.loginValidation,
	UserController.login);

router.post('/register', 
	UserController.createValidation,
	UserController.create);


export {router};