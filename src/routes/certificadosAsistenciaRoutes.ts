import express, { Router } from 'express';

import certificadosAsistenciaController from '../controllers/certificadosAsistenciaController';

class certificadosAsistenciaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', certificadosAsistenciaController.crearCertificado);
    }

}

export default new certificadosAsistenciaRoutes().router;

