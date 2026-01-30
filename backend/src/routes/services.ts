import { Router } from "express";
import {
  getServices,
  addService,
  updateService,
  deleteService,
  finalizeService
} from "../controllers/servicesController";


const router = Router();

router.get("/", getServices);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.put("/finalize/:id", finalizeService);

export default router;
