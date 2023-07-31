import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Photo from '../models/photoModel.js';


const createUser = async (req, res) => { 
  try {
      const user = await User.create(req.body);
      res.status(201).json({user: user._id});
  } catch (error) {


        console.log("ERROR", error);

        let errors2 = {};

        if(error.code === 11000) {
            errors2.email = "The email is already registered";
        }

        if (error.name === 'ValidationError'){ // 
            Object.keys(error.errors).forEach((key) =>  {
                errors2[key] = error.errors[key].message;
            }); //hata objesini yakaladık.

        }

        res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => { 
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username}); /* burada await kullanıyoruz çünkü veri tabanında bize gelen req.bodydeki username i arayıp user
        değişkenine atamamız gerekiyor. bu işlem zaman alıcı olduğundan aşağıdaki satırlar çalıştığında if ifadesinde yer alan user = false olarak görülüyor.
        bu yüzden bu if statement'a giremediğimiz için şifreleri kıyaslayamıyoruz */
        
        let same = false
        console.log("req.body", req.body);

        if(user) {
            same = await bcrypt.compare(password, user.password) // bu fonksiyon ile girilen şifre ile veritabanındaki şifre aynı ise same = true olur.
            console.log('same', same)
        }
        else {
            return res.status(401).json({ // 401: http unauthorized status code
                succeded: false,
                error: "There is no such user"
            });
        }
        if(same) {

            const token = createToken(user._id);
            res.cookie('jwt', token, { // parametreler : isim, olusturulan token, konfigürasyon objesi
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.redirect('/users/dashboard');
            
        }
        
        else {
            res.status(401).json({
                succeded: false,
                error: 'password are not matched'
            });
        }
    
    } catch (error) {
          res.status(500).json({
              succeded: false,
              error,
          });
    }
  };

const createToken = (userId) => {
    return jwt.sign( {userId}, process.env.JWT_SECRET, { expiresIn: '1d'});
};

const getDashboardPage = async(req, res) => { // async olmayan bir fonksiyonda await kullanılmaz hata verir.
    const photos = await Photo.find({user: res.locals.user._id}); // id'si giriş yapan kullanıcıınn idsine eşit olan kişinin fotoğraflarını getir dedik.
    const users = await User.findById({ _id: res.locals.user._id}).populate([
        "followings",
        "followers",
    ]);
    res.render('dashboard', {
        link: 'dashboard',
        photos,
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: {$ne : res.locals.user._id}}); // $ne : not equal anlamında != ifadesi olarak da düşünülebilir.
        // yani üstteki ifade ile bulunan userlar içinden _idsi lokaldeki userın (giriş yapan) idsine eşit olanı göstermiyoruz.
        res.status(200).render("users", { 
            users,
            link: "users"
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

const getAUser = async (req, res) => {
    try {
        const users = await User.findById({ _id : req.params.id});
        const photos = await Photo.find({ user: users._id});
        res.status(200).render("user", {
            users,
            photos,
            link: "users"
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

const follow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $push: {followers: res.locals.user._id} // usermodelde olusturdugumuz followers arrayine takip eden elemanı ekledik
            },
            {new: true},
            )

            user = await user.findByIdAndUpdate(
                {_id: res.locals.user._id},
                {
                    $push: {followings: req.params.id} // aynı şekilde followings arrayine de takip edileni ekledik.
                },
                {new: true},
            );
            res.status(200).json({
                succeded:true,
                user,
            });
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

const unfollow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $pull: {followers: res.locals.user._id}  // unfollow fonksiyonu da followla neredeyse aynı sadece 
                // push yerine pull eyleminde bulunuyoruz yani followers dizisine eklemek yerine çekiyoruz.
            },
            {new: true},
            )

            user = await user.findByIdAndUpdate(
                {_id: res.locals.user._id},
                {
                    $pull: {followings: req.params.id} 
                },
                {new: true},
            );
            res.status(200).json({
                succeded:true,
                user,
            });
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}


export { createUser, loginUser, getDashboardPage, getAllUsers, getAUser, follow, unfollow};

