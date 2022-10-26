import { Request, Response } from 'express';


import pool from '../database';

class CarrerasController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const games = await pool.query('SELECT * FROM carreras');
            res.json(games);
        } catch (error) {
            
        }
      
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const games = await pool.query('SELECT * FROM carreras WHERE id = ?', [id]);
            console.log(games.length);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "La carrera no existe" });
        } catch (error) {
            
        }
      
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query('INSERT INTO carreras set ?', [req.body]);
            res.json({ message: 'Carrera Guardada' });
        } catch (error) {
            
        }
       
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('UPDATE carreras set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "La carrera fue actualizada" });
        } catch (error) {
            
        }
      
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM carreras WHERE id = ?', [id]);
            res.json({ message: "La carrera fue eliminada" });
        } catch (error) {
            
        }
      
    }
}

const carrerasController = new CarrerasController;
export default carrerasController;