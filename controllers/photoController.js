import req from "express/lib/request.js";
import Photo from "../models/photoModel.js"; // modelimizi dahil ettik.

const createPhoto = async (req, res) => {
    
  try {
      const photo = await Photo.create(req.body);
      res.status(201).json({ // front-end e cevap gönderdik. 201: başarıyla sonuçlandı anlamına geliyor.
          succeded: true,
          photo,
      });
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

export { createPhoto , getAllPhotos}; 

/* thunderclientte simüle ettiğimizde photo adında boş bir objenin döndüğünü gördük bunun sebebi şu : 
photo adında bir nesne oluşturduğumuzda bunun cevabını beklemeden alttaki cevabı çalıştırıyor o yüzden boş görünüyor */

/* bu yüzden createPhoto metodunu asenkron haline getirip nesne oluşturma kısmında bekletmemiz gerek */