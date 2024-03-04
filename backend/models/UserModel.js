import mongoose from 'mongoose';

// Creamos un schema para el modelo de usuario
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"]
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true // Asegura que el correo electrónico sea único
    },
    password: {
      type: String,
      required: [true, "Please enter your password"]
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Relación con los posts del usuario
  },
  {
    timestamps: true, // Agrega campos de creación y actualización a los documentos
    versionKey: false // No mostramos la clave de
  }
);

// Creamos el modelo a partir del schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
