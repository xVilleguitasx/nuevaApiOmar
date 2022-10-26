import { Request, Response } from 'express';


import pool from '../database';

class TipoUsuarioController {

    public async list(req: Request, res: Response): Promise<void> {
       try {
         const games = await pool.query('SELECT * FROM tipo_usuario_admin');
         res.json(games);
       } catch (error) {
        
       }
    }

  
}

const tipoUsuarioController = new TipoUsuarioController;
export default tipoUsuarioController;