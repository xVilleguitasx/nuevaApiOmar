import { Request, Response } from 'express';


import pool from '../database';

class ProgramaController {

    public async list(req: Request, res: Response): Promise<void> {
     try {
           const games = await pool.query('SELECT * FROM programa');
           res.json(games);
     } catch (error) {
        
     }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
     try {
           const { id } = req.params;
           const games = await pool.query('SELECT * FROM programa WHERE id = ?', [id]);
          
           if (games.length > 0) {
               return res.json(games[0]);
           }
           res.status(404).json({ text: "El registro no existe" });
     } catch (error) {
        
     }
    }

    public async create(req: Request, res: Response): Promise<void> {
     try {
           const obj = JSON.parse(JSON.stringify(req.files));
           try {  (obj.imagen[0]) ? req.body.imagen = obj.imagen[0].path : "";}catch (error) {}
           try {    (obj.triptico[0]) ? req.body.triptico = obj.triptico[0].path : "";}catch (error) {}
           const result = await pool.query('INSERT INTO programa set ?', [req.body]);
           res.json({ message: 'Registro Guardado' });
     } catch (error) {
        
     }
    }

    public async update(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const obj = JSON.parse(JSON.stringify(req.files));
          try {  (obj.imagen[0]) ? req.body.imagen = obj.imagen[0].path : "";}catch (error) {}
          try {    (obj.triptico[0]) ? req.body.triptico = obj.triptico[0].path : "";}catch (error) {}
          await pool.query('UPDATE programa set ? WHERE id = ?', [req.body, id]);
          res.json({ message: "Registro actualizado" });
      } catch (error) {
        
      }
    }

    public async delete(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          await pool.query('DELETE FROM programa WHERE id = ?', [id]);
          res.json({ message: "Registro  eliminado" });
      } catch (error) {
        
      }
    }
}

const programaController = new ProgramaController;
export default programaController;