import express from 'express';
import * as userController from '../controllers/userController.js'; 
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/dashboard')
  .get(authMiddleware.authenticateToken, userController.getDashboardPage);

router.route('/').get(authMiddleware.authenticateToken, userController.getAllUsers); // çoğul kullanıcı sayfası için
router.route('/:id').get(authMiddleware.authenticateToken, userController.getAUser); // tekil kullanıcı sayfası için
// sitede giriş yapmadan fotoğraflar görünebilsin fakat fotoğrafları yükleyen kullanıcıları görmek için giriş kontrolü yapılsın dedik
// 13. ve 14. satırdaki route işlemlerinde

router.
  route("/:id/follow")
  .put(authMiddleware.authenticateToken, userController.follow);
router
  .route("/:id/unfollow")
  .put(authMiddleware.authenticateToken, userController.unfollow);

// authMiddleware.authenticateToken kısmı ile tokeni kontrol ediyor. giriş yaptık diyelim eğer token yoksa ve sayfayı yenilersek bizi yine
// dashboard sayfasına atmaması gerekir bu durumda bizi logine yönlendirir.

export default router;