import { Request, Response } from "express";

import pool from "../database";

class InformacionTuristicaController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM informacion_turistica");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT * FROM informacion_turistica WHERE id = ?",
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
      const obj = JSON.parse(JSON.stringify(req.files));
      try {
        req.body.boton1 = obj.boton1[0].path;
      } catch (error) {}
      try {
        req.body.boton2 = obj.boton2[0].path;
      } catch (error) {}
      const result = await pool.query(
        "INSERT INTO informacion_turistica set ?",
        [req.body]
      );
      res.json({ message: "Registro Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const obj = JSON.parse(JSON.stringify(req.files));
      try {
        req.body.boton1 = obj.boton1[0].path;
      } catch (error) {}
      try {
        req.body.boton2 = obj.boton2[0].path;
      } catch (error) {}
      await pool.query("UPDATE informacion_turistica set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Registro actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM informacion_turistica WHERE id = ?", [id]);
      res.json({ message: "Registro  eliminado" });
    } catch (error) {}
  }
}

const informacionTuristicaController = new InformacionTuristicaController();
export default informacionTuristicaController;
