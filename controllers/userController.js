import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

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
            res.status(200).send('You are logged in')
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

export { createUser, loginUser};

