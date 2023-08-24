import express from 'express';
import * as pageController from '../controllers/pageController.js'; // * as ile pageControllerdaki bütün objeleri dahil ettik.


const router = express.Router();
// console.log('Authen... token  :: ', typeof(authMiddleware.authenticateToken))
router.route('/').get(pageController.getIndexPage);

    // .get(authMiddleware.authenticateToken, pageController.getIndexPage); //ilk parametremiz bir fonksiyon olduğu için token null dönüyor
    // bu olay da index sayfasına girerken token bulunamadı hatasına sebep oluyor o yüzden yorum satırına aldım.

router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/logout').get(pageController.getLogout);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendMail);





export default router;