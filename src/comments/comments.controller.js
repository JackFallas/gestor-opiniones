import Comment from './comments.model.js';
import User from '../user/user.model.js';
import Publication from '../publication/publication.model.js';

export const getComments = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const comments = await Comment.find()
            .populate('user', 'name email')
            .populate('publication', 'title content')
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Comment.countDocuments();

        res.status(200).json({
            success: true,
            data: comments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios',
            error: error.message
        });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id).populate('user', 'name email').populate('publication', 'title content');

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el comentario',
            error: error.message
        });
    }
};

export const createComment = async (req, res) => {
    try {
        const { content, user, publication } = req.body;

        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const publicationExists = await Publication.findById(publication);
        if (!publicationExists) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        const comment = new Comment({ content, user, publication });
        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario agregado con éxito',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado para eliminar'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
};