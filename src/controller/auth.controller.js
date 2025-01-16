import User from "../models/users.models.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { crearAccesstoken } from "../libs/jwt.js";




// http://localhost:4000/api/create

export const create = async (req, res) => {
    try {
        const { email, contraseña, rol } = req.body;

        const userFound = await User.findOne({ email });


        if (userFound)
            return res.status(400).json(
                {message: ["El email ya esta registrado"]

                });
        

        // Generar un salto y hashear la contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(contraseña, salt);

        // Crear el nuevo usuario
        const newUser = new User({
            email,
            contraseña: hashedPassword,
            rol,
        }); 

        // Guardar en la base de datos
        const userSaved = await newUser.save();

        const token = await crearAccesstoken({
            id: userSaved._id,
        });

        res.cookie("token", token,{
            httpOnly:process.env.NODE_ENV === "desarrollo",
            secure: true, 
            sameSite: "none",

        })



       // Responder con los datos del usuario guardado
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            rol: userSaved.rol,
        });
    } catch (error) {
        
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        
        if (error.code === 11000) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

       
        return res.status(500).json({ message: "Error del servidor" });
    }
};






// http://localhost:4000/api/login 
export const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound)
            return res.status(400).json({
                message: ["El email no está registrado"]
            });

        const isMatch = await bcryptjs.compare(contraseña, userFound.contraseña);

        if (!isMatch)
            return res.status(400).json({
                message: ["Contraseña incorrecta"],
            });

        const token = await crearAccesstoken({
            id: userFound._id,
            email: userFound.email,
        });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV === "desarrollo",
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userFound._id,
            email: userFound.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export const verifyToken = async (req, res) =>{
    const { token } = req.cookie;
    if (!token) return res.json(false);

    jwt.verifyToken(token, TOKEN_SECRET, async (err, user) =>{
        if (err) return res.status (401);
   
    const userFound = await user.findById(user.id);
    if(!userFound) return res.status(401);

    return res.json({
        id: userFound._id,
        email: userFound.email,
        rol: userFound.rol,
    });   

    });

};
