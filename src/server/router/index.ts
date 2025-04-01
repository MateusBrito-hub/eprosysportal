import { Router } from 'express';
import { router as CompanyRoutes } from './company';
import { router as authRouter} from './user'
import { router as SpedRouter } from './sped'
import { authMiddleware } from '../shared/middlewares/Auth'

const router = Router();

router.use('/user', authRouter)
router.use('/company', authMiddleware , CompanyRoutes);
router.use('/sped', authMiddleware, SpedRouter);

export {router};