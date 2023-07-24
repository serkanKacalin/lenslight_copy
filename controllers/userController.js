import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createUser = async (req, res) => { 
  try {
      const user = await User.create(req.body);
      res.status(201).json({ 
          succeded: true,
          user,
      });
  } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
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
            // window.location.replace('/dashboard.ejs');
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

const getDashboardPage = (req, res) => {
    res.render('dashboard', {
        link: '/dashboard',
    });
};

export { createUser, loginUser, getDashboardPage};

