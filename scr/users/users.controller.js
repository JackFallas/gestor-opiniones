// Importaciones del modelo
import User from "./users.model.js";
import bcrypt from "bcryptjs";

// Obtener usuarios (GET)
export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        // Obtenemos usuarios no "eliminados"
        const query = { active: true };

        const [users, total] = await Promise.all([
            User.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ name: 1 }),
            User.countDocuments(query),
        ]);

        res.status(200).json({
            succes: true,
            message: "Usuarios obtenidos correctamente",
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            users
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al obtener los usuarios",
            error: error.message
        });
    }
};

// Agregar usuario (POST)
export const register = async (req, res) => {
    try {
        const { password, ...data } = req.body;

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = new User({
            ...data,
            password: hashedPassword
        });

        // Guardar usuario
        await user.save();

        res.status(201).json({
            succes: true,
            message: "Usuario registrado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al registrar el usuario",
            error: error.message
        });
    }
};

// Iniciar sesión (POST)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                succes: false,
                message: "Usuario no encontrado"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                succes: false,
                message: "Contraseña incorrecta"
            });
        }
        res.status(200).json({
            succes: true,
            message: "Sesión iniciada correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};

// Actualizar usuario (PUT)
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...data } = req.body;

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Actualizar usuario
        const user = await User.findByIdAndUpdate(id, data, { new: true });

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            succes: true,
            message: "Usuario actualizado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
};

// Desactivar usuario (Delete)
export const desactivate = async (req, res) => {
    try {
        const { id } = req.params;

        // Desactivar usuario
        const user = await User.findByIdAndUpdate(id, { active: false }, { new: true });

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            succes: true,
            message: "Usuario desactivado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al desactivar el usuario",
            error: error.message
        });
    }
};