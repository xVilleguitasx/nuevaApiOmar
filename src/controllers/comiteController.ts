import { Request, Response } from "express";

import pool from "../database";

class ComiteController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query(
        "SELECT c.id, tc.tipo,c.validacion, c.nombre, c.cargo, c.instituto, c.pais, c.edicion,c.certificado_C FROM comite as c, tipo_comite as tc WHERE c.id_tipo_per=tc.id ORDER BY c.id ASC"
      );
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query("SELECT * FROM comite WHERE id = ?", [id]);
      console.log(games.length);
      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "El comite no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO comite set ?", [req.body]);
      res.json({ message: "Comite Guardada" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE comite set ? WHERE id = ?", [req.body, id]);
      res.json({ message: "Comite fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM comite WHERE id = ?", [id]);
      res.json({ message: "Comite fue eliminado" });
    } catch (error) {}
  }
}

const comiteController = new ComiteController();
export default comiteController;
