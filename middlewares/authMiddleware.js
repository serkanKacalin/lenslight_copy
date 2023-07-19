import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    console.log('token', token);

    if(!token) {
        return res.status(401).json({
            succeeded : false,
            error: 'No token available'
        }) 
    }


    req.user = await User.findById( // gelen requestteki user ı veri tabanından gelecek olan id'nin sahip olduğu tokenla onayladıktan sonra eşitler.
        jwt.verify(token, process.env.JWT_SECRET).userId
        ) 
    next(); // bir sonraki işleme geç komutu. yani yönlendirilen sayfaya

    };


export { authenticateToken };