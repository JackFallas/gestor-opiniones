import User from "../user/user.model.js";

export const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        // 4. Login exitoso
        res.status(200).json({
            success: true,
            message: `Bienvenido de nuevo, ${user.name}`,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};