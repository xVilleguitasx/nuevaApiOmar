import express, { Router } from "express";

import expositorController from "../controllers/expositorController";

class expositorRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", expositorController.list);
    this.router.get("/:id", expositorController.ExpositorPaper);
    this.router.post("/", expositorController.crearCertificado);
  }
}

export default new expositorRoutes().router;
