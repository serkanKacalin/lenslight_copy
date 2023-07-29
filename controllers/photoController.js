import Photo from "../models/photoModel.js"; // modelimizi dahil ettik.
import { v2 as cloudinary} from 'cloudinary';
import fs from "fs";

const createPhoto = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, // yüklediğimiz görselin geçici path'i
        {
            use_filename : true,
            folder: "lenslight_tr"
        }
    );
    
    console.log('RESULT', result);

  try {
      await Photo.create({
        name: req.body.name,
        description: req.body.description,
        user: res.locals.user._id,
        url: result.secure_url
      });
      
      fs.unlinkSync(req.files.image.tempFilePath);

      res.status(201).redirect('/users/dashboard'); // front-end e cevap gönderdik. 201: başarıyla sonuçlandı anlamına geliyor.
  } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
  }

};

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({}); // varolan tüm fotoğrafları getirmek için boş obje yerleştirdik.
        res.status(200).render("Photos", { // kıvrık parantezler ile belirtilen kısım configuration objesidir.
            photos,
            link: "photos"
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}
// veri tabanında bulunan bir veriyi alacağı için getAllPhotos fonksiyonu yine bir asenkron fonksiyon olacak .



/* thunderclientte simüle ettiğimizde photo adında boş bir objenin döndüğünü gördük bunun sebebi şu : 
photo adında bir nesne oluşturduğumuzda bunun cevabını beklemeden alttaki cevabı çalıştırıyor o yüzden boş görünüyor */

/* bu yüzden createPhoto metodunu asenkron haline getirip nesne oluşturma kısmında bekletmemiz gerek */

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({_id : req.params.id}).populate("user"); 
        res.status(200).render("photo", {
            photo,
            link: "photos"
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

export { createPhoto , getAllPhotos, getAPhoto }; 