import { Request, Response } from "express";

import pool from "../database";

class SemestresController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM semestres");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query("SELECT * FROM semestres WHERE id = ?", [
        id,
      ]);

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El semestre no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO semestres set ?", [
        req.body,
      ]);
      res.json({ message: "Semestre Guardada" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE semestres set ? WHERE id = ?", [req.body, id]);
      res.json({ message: "El semestres fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM semestres WHERE id = ?", [id]);
      res.json({ message: "El semestre fue eliminado" });
    } catch (error) {}
  }
}

const semestresController = new SemestresController();
export default semestresController;
