import { Router } from 'express';
import { updateLink, createLink, removeLink, getLinkById, getLinks } from '../controllers/link.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { linkValidator, paramLinkValidator, tokenHeaderValidator } from '../middlewares/validatorManager.js';

const router = Router();

// GET /api/v1/link Todos los links
router.get("/", tokenHeaderValidator, requireToken, getLinks);

// GET /api/v1/link/:id Un link
router.get('/:id', requireToken, linkValidator, getLinkById);

// POST /api/v1/link Crear un link
router.post('/', tokenHeaderValidator, requireToken, linkValidator, createLink);

// PATCH /api/v1/link/:id Actualizar un link
router.patch('/:id', requireToken, paramLinkValidator, linkValidator, updateLink);

// DELETE /api/v1/link/:id Borrar un link
router.delete('/:id', tokenHeaderValidator, requireToken, paramLinkValidator, removeLink);

export default router;