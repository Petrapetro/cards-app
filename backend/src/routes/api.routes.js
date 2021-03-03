import express from 'express'
import cors from 'cors'

import { userController } from '../dependencies/dependencyInjection'

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post('/signup', userController.signUp)
router.post('/auth', userController.login)

export default router;