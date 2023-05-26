import Photo from "../models/photoModel.js"; // modelimizi dahil ettik.

const createPhoto = (req, res) => {
    const photo = Photo.create(req.body);
    res.status(201).json({ // front-end e cevap gönderdik. 201: başarıyla sonuçlandı anlamına geliyor.
        succeded: true,
        photo,
    });
};

export { createPhoto };