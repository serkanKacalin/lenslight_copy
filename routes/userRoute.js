import express from 'express';
import * as userController from '../controllers/userController.js'; 
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/dashboard').get(authMiddleware.authenticateToken, userController.getDashboardPage);

// authMiddleware.authenticateToken kısmı ile tokeni kontrol ediyor. giriş yaptık diyelim eğer token yoksa ve sayfayı yenilersek bizi yine
// dashboard sayfasına atmaması gerekir bu durumda bizi logine yönlendirir.

export default router;