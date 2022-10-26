import { Request, Response } from 'express';


import pool from '../database';

class ParaleloController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
     
        const games = await pool.query('SELECT * FROM paralelo');
        
        res.json(games);
               
    } catch (error) {
            
    }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        try {
            
       
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM paralelo WHERE id = ?', [id]);

        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "El paralelo no existe" });
    } catch (error) {
            
    }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query('INSERT INTO paralelo set ?', [req.body]);
            res.json({ message: 'Paralelo Guardado' });
        } catch (error) {
            
        }
      
    }

    public async update(req: Request, res: Response): Promise<void> {
    try {
        
    
        const { id } = req.params;
        await pool.query('UPDATE paralelo set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El paralelo fue actualizado" });
    } catch (error) {
        
    }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            
      
        const { id } = req.params;
        await pool.query('DELETE FROM paralelo WHERE id = ?', [id]);
        res.json({ message: "Paralelo  eliminado" });
    } catch (error) {
            
    }
    }
}

const paraleloController = new ParaleloController;
export default paraleloController;