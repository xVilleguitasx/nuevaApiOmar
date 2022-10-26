import { Request, Response } from 'express';
import * as bcryptjs from "bcryptjs";

import pool from '../database';

class UsuarioController {


    public async list(req: Request, res: Response): Promise<void> {
       try {
         const games = await pool.query('SELECT u.id,u.usuario,tu.nombre as tipo_usuario from usuario as u INNER JOIN tipo_usuario_admin as tu on(u.id_tipo_per=tu.id)');
         res.json(games);
       } catch (error) {
        
       }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        
       try {
         const { id } = req.params;
         const games = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [id]);
         
         if (games.length > 0 && games.length < 2) {
             return res.json(games[0]);
         }
         res.status(404).json({ text: "El registro no existe" });
       } catch (error) {
        
       }
    }
    public async create(req: Request, res: Response): Promise<void> {
       
       try {
         const salt = bcryptjs.genSaltSync(10);
         req.body.pass = bcryptjs.hashSync(req.body.pass, salt);
         const result = await pool.query('INSERT INTO usuario set ?', [req.body]);
         res.json( { message: 'Usuario Guardado' });
       } catch (error) {
        
       }
    }
    public async update(req: Request, res: Response): Promise<void> {
       try {
         const { id } = req.params;
         await pool.query('UPDATE usuario set ? WHERE id = ?', [req.body, id]);
         res.json({ message: "El registro fue actualizado" });
       } catch (error) {
        
       }
    }

    public async delete(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
          res.json({ message: "registro  eliminado" });
      } catch (error) {
        
      }
    }

}

const usuarioController = new UsuarioController;
export default usuarioController;