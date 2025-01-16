import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo no es válido'], 
    },
   
    contraseña: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['Usuario', 'Administrador', 'Super Administrador'], 
        default: 'Usuario', // Rol predeterminado
    },
    
});

export default mongoose.model("user", userSchema);

