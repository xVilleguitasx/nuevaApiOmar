import { Request, Response } from 'express';


import pool from '../database';

class PersonasController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            
       
        const games = await pool.query('SELECT * FROM persona');
        res.json(games);
    } catch (error) {
            
    }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        try {
       
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM persona WHERE documento_identificacion = ?', [id]);

        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "La persona no existe" });
             
    } catch (error) {
            
    }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            
      
        const result = await pool.query('INSERT INTO persona set ?', [req.body]);

        const id = await pool.query('Select id from persona where  documento_identificacion = ?', [req.body.documento_identificacion]);
        res.json(id);
    } catch (error) {
            
    }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
        await pool.query('UPDATE persona set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "La persona fue actualizada" });
        } catch (error) {
            
        }
      
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM persona WHERE id = ?', [id]);
            res.json({ message: "La persona fue eliminada" });
        } catch (error) {
            
        }
    }
}

const personasController = new PersonasController;
export default personasController;