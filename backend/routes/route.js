import express from "express";
import { createUser, getUserByEmailAndPassword, getUsers, updateUser, deleteUser } from "../controllers/UserController.js";
import { verifyToken } from "../Middlewares/auth.js";

const router = express.Router();

// Forma 1
// Rutas protegidas con JWT
router.get("/", getUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

// Ruta para crear un nuevo usuario
router.post("/signup", createUser);

// Ruta para obtener un usuario por correo electrónico y contraseña
router.post("/login", getUserByEmailAndPassword);

export default router;
