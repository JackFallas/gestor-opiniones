// Importamos Router de express y los controladores
import { Router } from "express";
import { UserMiddleware } from "../middlewares/user.middleware.js"; // Importamos tu clase

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "./user.controller.js";

const router = Router();

// Obtener usuarios
router.get("/", getUsers);

// Obtener usuario por ID
router.get("/:id", [UserMiddleware.existsById], getUserById);

// Crear
router.post("/", [UserMiddleware.isUnique], createUser);

// Actualizar
router.put("/:id", [UserMiddleware.existsById], updateUser);

// Eliminar
router.delete("/:id", deleteUser);

export default router;