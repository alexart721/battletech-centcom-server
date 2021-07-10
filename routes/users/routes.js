import express from 'express';
import * as users from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('profile', authMiddleware, users.getUser);
router.post('register', users.createUser);
router.post('login', users.login);
router.post('logout', authMiddleware, users.logout);
router.put('updateuser', authMiddleware, users.updateUser);

export default router;
