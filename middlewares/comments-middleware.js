import Comment from "./comments.model.js";
import Publication from "../publication/publication.model.js";
import User from "../user/user.model.js";

export class CommentMiddleware {

    // Valida que el comentario exista
    static existsById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const comment = await Comment.findById(id);

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comentario no encontrado"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // Valida que tanto el usuario como la publicación existan antes de comentar
    static validateDependencies = async (req, res, next) => {
        try {
            const { user, publication } = req.body;

            const [userExists, pubExists] = await Promise.all([
                User.findById(user),
                Publication.findById(publication)
            ]);

            if (!userExists) return res.status(404).json({ success: false, message: "Usuario no existe" });
            if (!pubExists) return res.status(404).json({ success: false, message: "Publicación no existe" });

            next();
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}