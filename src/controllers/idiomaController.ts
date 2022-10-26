import { Request, Response } from 'express';


import pool from '../database';

class IdiomaContreoller {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            
       
        const games = await pool.query('SELECT * FROM idiomas');
        res.json(games);
    } catch (error) {
            
    }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        try {
            
        
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM idiomas WHERE id = ?', [id]);

        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "El idioma no existe" });
    } catch (error) {
            
    }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            
        
        const result = await pool.query('INSERT INTO idiomas set ?', [req.body]);
        res.json({ message: 'Idioma Guardado' });
    } catch (error) {
            
    }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            
        
        const { id } = req.params;
        await pool.query('UPDATE idiomas set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El idioma fue actualizado" });
    } catch (error) {
            
    }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            
      
        const { id } = req.params;
        await pool.query('DELETE FROM idiomas WHERE id = ?', [id]);
        res.json({ message: "Idioma  eliminado" });
    } catch (error) {
            
    }
    }
}

const idiomaContreoller = new IdiomaContreoller;
export default idiomaContreoller;