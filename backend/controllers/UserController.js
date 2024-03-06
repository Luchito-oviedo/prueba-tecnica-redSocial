import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../models/UserModel.js";

export const createUser = async (req, res) => {
    try {
        // const MONGO_URI = process.env.MONGODB_URI;
        // const JWT_SECRET = process.env.JWT_SECRET;
        const { fullName, age, email, password } = req.body;
        
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el usuario en la base de datos con la contraseña hasheada
        const user = await UserModel.create({ fullName, age, email, password: hashedPassword });
        
        // Genera un token JWT con la información del usuario
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Guarda el token en la base de datos asociado al usuario
        user.token = token;
        await user.save();

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Error creating new user" + error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" + error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" + error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" + error.message });
    }
};

export const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { token } = req.body;

        // Verifica y decodifica el token para obtener el ID del usuario
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Busca al usuario en la base de datos utilizando el ID obtenido del token
        const user = await UserModel.findById(userId);

        // Verifica si el usuario existe y devuelve su correo y contraseña si es así
        if (user) {
            res.status(200).json({ email: user.email, password: user.password });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user" + error.message });
    }
};