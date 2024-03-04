import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/UserController.js";

const router = express.Router();

// Forma 1
// router.get("/", getUsers)
// router.get("/:id", getUser)
// router.put("/:id", updateUser)
// router.post("/", createUser)
// router.delete("/:id" , deleteUser )

// Forma 2
router.route('/').get(getUsers).post(createUser); // GET y POST
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser); // GET, PUT y DELETE

export default router;
