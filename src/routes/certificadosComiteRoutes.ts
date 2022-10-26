import express, { Router } from 'express';

import certificadosCController from '../controllers/certificadosCController';

class certificadosCRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', certificadosCController.crearCertificado);
    }

}

export default new certificadosCRoutes().router;

