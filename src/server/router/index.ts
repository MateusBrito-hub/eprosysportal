import { Router } from 'express';
import {router as CompanyRoutes} from './company';

const router = Router();

router.use('/company', CompanyRoutes);

export {router};