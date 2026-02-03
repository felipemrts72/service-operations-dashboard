import { Router } from 'express';
import {
  getServices,
  addService,
  updateService,
  deleteService,
  finalizeService,
} from '../controllers/servicesController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// todas protegidas
router.use(authMiddleware);

router.get('/', getServices);
router.post('/', addService);
router.put('/:id', updateService);
router.put('/delete/:id', deleteService);
router.put('/finalize/:id', finalizeService);

export default router;
