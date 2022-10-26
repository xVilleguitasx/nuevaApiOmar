import { Request, Response } from "express";

import pool from "../database";

class GaleriaInformacionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query(
        "SELECT * FROM galeria_informacion_turistica"
      );
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM galeria_informacion_turistica WHERE id = ?",
        [id]
      );

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El registro no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      req.body.imagen = req.file?.path;
      const result = await pool.query(
        "INSERT INTO galeria_informacion_turistica set ?",
        [req.body]
      );
      res.json({ message: "Registro Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (req.file?.path !== undefined) {
        req.body.imagen = req.file?.path;
      }
      await pool.query(
        "UPDATE galeria_informacion_turistica set ? WHERE id = ?",
        [req.body, id]
      );
      res.json({ message: "Registro actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query(
        "DELETE FROM galeria_informacion_turistica WHERE id = ?",
        [id]
      );
      res.json({ message: "Registro  eliminado" });
    } catch (error) {}
  }
}

const galeriaInformacionController = new GaleriaInformacionController();
export default galeriaInformacionController;
