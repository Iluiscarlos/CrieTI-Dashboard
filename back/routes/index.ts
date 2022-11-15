import cors from 'cors';
import express, { } from 'express';
import login from './login';
import User from './users';

const router = express.Router();

router.use(cors());

router.use(User);
router.use(login);


export default router;