import Publication from "../publication/publication.model.js";
import User from "../user/user.model.js";

export class PublicationMiddleware {

    // Verifica la existencia de la publicación
    static existsById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const publication = await Publication.findById(id);

            if (!publication) {
                return res.status(404).json({
                    success: false,
                    message: "Publicación no encontrada"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Valida que el campo 'user' sea un usuario real en la DB
    static validateAuthor = async (req, res, next) => {
        try {
            const { user } = req.body;
            const userExists = await User.findById(user);

            if (!userExists) {
                return res.status(404).json({
                    success: false,
                    message: "El autor (User ID) proporcionado no existe"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}