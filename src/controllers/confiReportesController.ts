import { Request, Response } from "express";

import pool from "../database";

class ConfiReportesController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM confi_reportes");
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
        obj.banner[0] ? (req.body.banner = obj.banner[0].path) : "";
      } catch (error) {}
      await pool.query("UPDATE confi_reportes set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Comite fue actualizado" });
    } catch (error) {}
  }
}

const confiReportesController = new ConfiReportesController();
export default confiReportesController;
