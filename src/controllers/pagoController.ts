import { Request, Response } from "express";

import pool from "../database";

class PagoContreoller {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM tipopago");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query("SELECT * FROM tipopago WHERE id = ?", [
        id,
      ]);

      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "Tipo de pago no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO tipopago set ?", [req.body]);
      res.json({ message: "Tipo de pago Guardado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE tipopago set ? WHERE id = ?", [req.body, id]);
      res.json({ message: "Tipo de pago fue actualizado" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM tipopago WHERE id = ?", [id]);
      res.json({ message: "Tipo de pago  eliminado" });
    } catch (error) {}
  }
}

const pagoContreoller = new PagoContreoller();
export default pagoContreoller;
