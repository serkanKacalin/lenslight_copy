import req from "express/lib/request.js";
import Photo from "../models/photoModel.js"; // modelimizi dahil ettik.

const createPhoto = async (req, res) => {
    
  try {
      await Photo.create({
        name: req.body.name,
        description: req.body.description,
        user: res.locals.user._id,
      });
      
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
        const photo = await Photo.findById({_id : req.params.id}); 
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