import { Router } from 'express';
import {
  getServices,
  addService,
  updateService,
  deleteService,
  finalizeService,
} from '../controllers/servicesController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/isAdmin';
import { canViewServices } from '../middlewares/canViewServices';

const router = Router();

// visualizar (admin + viewer)
router.get('/', authMiddleware, canViewServices, getServices);

// somente admin
router.post('/', authMiddleware, isAdmin, addService);
router.put('/:id', authMiddleware, isAdmin, updateService);
router.put('/delete/:id', authMiddleware, isAdmin, deleteService);
router.put('/finalize/:id', authMiddleware, isAdmin, finalizeService);

export default router;
