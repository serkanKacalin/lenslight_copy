import express from 'express';
import * as pageController from '../controllers/pageController.js'; // * as ile pageControllerdaki bütün objeleri dahil ettik.
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
// console.log('Authen... token  :: ', typeof(authMiddleware.authenticateToken))
router
  .route('/')
//   .get(authMiddleware.authenticateToken, pageController.getIndexPage); ilk parametremiz bir fonksiyon olduğu için token null dönüyor
// bu olay da index sayfasına girerken token bulunamadı hatasına sebep oluyor o yüzden yorum satırına aldım.
  .get(pageController.getIndexPage);

router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);    



export default router;