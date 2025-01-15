import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";



export const auth = (req, res, next) =>{
    try{
        const {token} = req.cookie;

        if (!token)
            return res.status(401).json({message: "token denegado"});
        
        jwt.verify(token, TOKEN_SECRET,(err, user) =>{
            if (err)
                return res.status(401).json({message: "no autorizado"});
            req.user = user;
            next();

        });
    }catch (error){
        res.status(500).json({massage: error.massage});
    }
};
