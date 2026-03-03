import Publication from './publication.model.js';
import User from '../user/user.model.js';


export const getPublications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);


        const publications = await Publication.find()
            .populate('user', 'name email')
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Publication.countDocuments();

        res.status(200).json({
            success: true,
            data: publications,
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
            message: 'Error al obtener publicaciones',
            error: error.message
        });
    }
};

// --- GET BY ID ---
export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id).populate('user', 'name email');

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la publicación',
            error: error.message
        });
    }
};

// --- POST (Create) ---
export const createPublication = async (req, res) => {
    try {
        const { title, content, user } = req.body;

        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const publication = new Publication({ title, content, user });
        await publication.save();

        res.status(201).json({
            success: true,
            message: 'Publicada con éxito',
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear publicación',
            error: error.message
        });
    }
};

// --- PUT (Update) ---
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByIdAndUpdate(id, req.body, { new: true });

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Actualizada',
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// --- DELETE ---
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByIdAndDelete(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró para eliminar'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar',
            error: error.message
        });
    }
};