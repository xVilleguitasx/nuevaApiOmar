import { Request, Response } from "express";

import pool from "../database";

class GaleriaLugarController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM galeria_lugar_del_evento");
      res.json(games);
    } catch (error) {}
  }
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (req.file?.path !== undefined) {
        req.body.imagen = req.file?.path;
      }
      const result = await pool.query(
        "INSERT INTO galeria_lugar_del_evento set ?",
        [req.body]
      );
      res.json({ message: "Registro Creado" });
    } catch (error) {}
  }
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (req.file?.path !== undefined) {
        req.body.imagen = req.file?.path;
      }

      await pool.query(`UPDATE galeria_lugar_del_evento set ? WHERE id = ?`, [
        req.body,
        id,
      ]);
      res.json({ message: "Registro actualizado" });
    } catch (error) {}
  }
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM galeria_lugar_del_evento WHERE id = ?", [
        id,
      ]);
      res.json({ message: "Registro  eliminado" });
    } catch (error) {}
  }
}

const galeriaLugarController = new GaleriaLugarController();
export default galeriaLugarController;
