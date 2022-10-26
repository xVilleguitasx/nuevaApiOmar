import { Request, Response } from "express";

import pool from "../database";

class PaperContreoller {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM paper");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query("SELECT * FROM paper WHERE id_inscripcion = ? order by id DESC", [id]);

      if (games.length > 0) {
        return res.json(games);
      }
      res.status(404).json({ text: "El paper no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO paper set ?", [req.body]);
      const id = await pool.query(
        "Select id from paper where  id_inscripcion = ?",
        [req.body.id_inscripcion]
      );
      res.json(id);
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    console.log(req.body)
    try {
      const { id } = req.params;
      await pool.query("UPDATE paper set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "El paper fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM paper WHERE id = ?", [id]);
      res.json({ message: "Paper  eliminado" });
    } catch (error) {}
  }
}

const paperContreoller = new PaperContreoller();
export default paperContreoller;
