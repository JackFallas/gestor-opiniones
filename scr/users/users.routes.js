import { Router } from "express";
import {
    getUsers,
    register,
    update,
    desactivate,
    login
} from "./users.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
// http://localhost:3001/users
router.get("/", getUsers);

// Ruta para registrar un nuevo usuario
// http://localhost:3001/users/register
router.post("/register", register);

// Ruta para iniciar sesión
// http://localhost:3001/users/login
router.post("/login", login);

// Ruta para actualizar un usuario
// http://localhost:3001/users/:id
router.put("/:id", update);

// Ruta para desactivar un usuario
// http://localhost:3001/users/:id
router.delete("/:id", desactivate);

export default router;
