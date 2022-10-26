import { Request, Response } from "express";
import fs from "fs";

import pool from "../database";

class RegistroInformacionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM registro_informacion");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM registro_informacion WHERE id = ?",
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
        "INSERT INTO registro_informacion set ?",
        [req.body]
      );
      res.json(result);
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (req.file?.path !== undefined) {
        req.body.imagen = req.file?.path;
      }
      await pool.query("UPDATE registro_informacion set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "registro actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM registro_informacion WHERE id = ?", [id]);
      res.json({ message: "registro  eliminado" });
    } catch (error) {}
  }
}

const registroInformacionController = new RegistroInformacionController();
export default registroInformacionController;
