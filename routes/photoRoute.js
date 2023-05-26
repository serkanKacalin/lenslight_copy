import express from 'express';
import * as photoController from '../controllers/photoController.js'; // * as ile pageControllerdaki bütün objeleri dahil ettik.

const router = express.Router();

router.route('/').post(photoController.createPhoto);
// route('/' olmasının sebebi şu eğer ('/test') olsaydı /photos/test kısmına yönlendirirdi. yani ekstra bir sekmeye yönlendiriyo)
// get yerine post isteğinde bulunuyoruz artık.
// formdan gelen verileri modele gönderip modeldeki verilere göre oluşturuyor.

export default router;