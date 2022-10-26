import { Request, Response } from "express";

import pool from "../database";

class IdentificacionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM tipodocumento");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM tipodocumento WHERE id = ?",
        [id]
      );

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El documento no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO tipodocumento set ?", [
        req.body,
      ]);
      res.json({ message: "Documento Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE tipodocumento set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "El documento fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM tipodocumento WHERE id = ?", [id]);
      res.json({ message: "El documento fue eliminado" });
    } catch (error) {}
  }
}

const identificacionController = new IdentificacionController();
export default identificacionController;
