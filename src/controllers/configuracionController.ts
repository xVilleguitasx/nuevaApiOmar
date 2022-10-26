import { Request, Response } from 'express';


import pool from '../database';

class ConfifuracionController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            
        
        const games = await pool.query('SELECT * FROM configuraciones');
        res.json(games);
    } catch (error) {
            
    }
    }
    public async update(req: Request, res: Response): Promise<void> {
        try {
            
       
        const { id } = req.params;
        await pool.query('UPDATE configuraciones set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "La configuración fue actualizada" });
    } catch (error) {
            
    }
    }
}
const confifuracionController = new ConfifuracionController;
export default confifuracionController;