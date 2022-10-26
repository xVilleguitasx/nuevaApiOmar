import express, { Router } from 'express';

import autoresController from '../controllers/certificadosAutoresController';

class AutoresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', autoresController.create);
        this.router.post('/autoresPaper', autoresController.AutoresPaper);
        this.router.get('/', autoresController.list);
        this.router.put('/:id', autoresController.update);
        this.router.put('/actualizar/:id', autoresController.actualizarAutor);
        this.router.delete('/:id', autoresController.delete);
    }

}

export default new AutoresRoutes().router;

