import User from "../user/user.model.js";

/**
 * Validaciones específicas para el modelo de Usuario
 */
export class UserMiddleware {

    // Verifica si el usuario existe mediante el ID de los parámetros
    static existsById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "El usuario con ese ID no existe"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Evita duplicados de email o username al crear
    static isUnique = async (req, res, next) => {
        try {
            const { email, username } = req.body;
            const existingUser = await User.findOne({
                $or: [{ email }, { username }]
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "El email o el nombre de usuario ya están en uso"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}