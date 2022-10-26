import { Request, Response } from 'express';


import pool from '../database';

class TipoComiteController {

    public async list(req: Request, res: Response): Promise<void> {
       try {
         const games = await pool.query('SELECT * FROM tipo_comite');
         res.json(games);
       } catch (error) {
        
       }
    }

    
}

const tipoComiteController = new TipoComiteController;
export default tipoComiteController;    