import { Request, Response } from "express";
import fs from "fs";

import pool from "../database";

class PatrocinadorController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM patrocinadores");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM patrocinadores WHERE id_per_pert = ?",
        [id]
      );
      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El Patrocinador no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      req.body.imagen = req.file?.path;
      const result = await pool.query("INSERT INTO patrocinadores set ?", [
        req.body,
      ]);
      res.json(result);
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (req.file?.path !== undefined) {
        req.body.imagen = req.file?.path;
      }
      await pool.query("UPDATE patrocinadores set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Patrocinador actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM patrocinadores WHERE id = ?", [id]);
      res.json({ message: "Patrocinador  eliminado" });
    } catch (error) {}
  }
}

const patrocinadorController = new PatrocinadorController();
export default patrocinadorController;
