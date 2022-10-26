import { Router } from 'express';
import multer from "../libs/storageImagenesPortada";
import mailerController from '../controllers/mailerController';

class mailerRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {

        this.router.post('/mailInscritos', mailerController.MailInscritos);
        this.router.post('/mailRegistro', mailerController.MailRegistro);
        this.router.post('/mailSubidaTiket', mailerController.MailSubidaTiket);
        this.router.post('/mailVerificacion', mailerController.MailVerificación);
    }

}

export default new mailerRoutes().router;

