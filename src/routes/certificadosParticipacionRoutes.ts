import express, { Router } from 'express';

import multer from "../libs/storageCertificadosP";
import certificadosPController from '../controllers/certificadosPController';

class certificadosPRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', certificadosPController.crearCertificado);
    }

}

export default new certificadosPRoutes().router;

