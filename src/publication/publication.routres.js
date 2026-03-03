import { Router } from "express";
import { getPublications, getPublicationById, createPublication, updatePublication, deletePublication } from "./pubication.controller.js";

const router = Router();

router.get('/', getPublications);
router.get('/:id', getPublicationById);
router.post('/', createPublication);
router.put('/:id', updatePublication);
router.delete('/:id', deletePublication);

export default router;