import { Request, Response } from "express";

import pool from "../database";

class InformacionCongresoController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM informacion_congreso");
      res.json(games);
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const obj = JSON.parse(JSON.stringify(req.files));
      try {
        obj.logo[0] ? (req.body.logo = obj.logo[0].path) : "";
      } catch (error) {}
      try {
        obj.favicon[0] ? (req.body.favicon = obj.favicon[0].path) : "";
      } catch (error) {}
      await pool.query("UPDATE informacion_congreso set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Registro actualizado" });
    } catch (error) {}
  }
}

const informacionCongresoController = new InformacionCongresoController();
export default informacionCongresoController;
