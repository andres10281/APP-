import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que los correos sean únicos
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo no es válido'], // Validación de formato de email
    },
   
    contraseña: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['Usuario', 'Administrador', 'Super Administrador'], // Roles permitidos
        default: 'Usuario', // Rol predeterminado
    },
    
});

export default mongoose.model("user", userSchema);

