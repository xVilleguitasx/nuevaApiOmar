import { Request, Response } from "express";

import pool from "../database";

class TipoIncripcionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM tipoinscripcion");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM tipoinscripcion WHERE id = ?",
        [id]
      );

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El tipo de inscripción no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO tipoinscripcion set ?", [
        req.body,
      ]);
      res.json({ message: "El tipo de inscripción Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE tipoinscripcion set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "El tipo de inscripción fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM tipoinscripcion WHERE id = ?", [id]);
      res.json({ message: "El tipo de inscripción fue eliminado" });
    } catch (error) {}
  }
}

const tipoIncripcionController = new TipoIncripcionController();
export default tipoIncripcionController;
