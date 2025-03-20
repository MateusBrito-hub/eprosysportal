import { Router } from 'express';
import { router as CompanyRoutes } from './company';
import { router as authRouter} from './user'
import { authMiddleware } from '../shared/middlewares/Auth'

const router = Router();

router.use('/user', authRouter)
router.use('/company', authMiddleware , CompanyRoutes);

export {router};