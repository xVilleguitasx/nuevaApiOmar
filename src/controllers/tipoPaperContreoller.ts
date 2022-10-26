import { Request, Response } from "express";

import pool from "../database";

class TipoPaperContreoller {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM tipopaper");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query("SELECT * FROM tipopaper WHERE id = ?", [
        id,
      ]);

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El paper no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO tipopaper set ?", [
        req.body,
      ]);
      res.json({ message: "paper Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE tipopaper set ? WHERE id = ?", [req.body, id]);
      res.json({ message: "El paper fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM tipopaper WHERE id = ?", [id]);
      res.json({ message: "Paper  eliminado" });
    } catch (error) {}
  }
}

const tipoPaperContreoller = new TipoPaperContreoller();
export default tipoPaperContreoller;
