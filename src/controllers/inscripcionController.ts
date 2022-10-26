import { Request, Response } from "express";
import fs from "fs";

import pool from "../database";

class InscripcionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query("SELECT * FROM inscripcion");
      res.json(games);
    } catch (error) {}
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const games = await pool.query(
        "SELECT i.id, i.id_per_pert,i.id_tipopago,i.id_idioma,i.cod_pago,i.resultado_autorizacion,i.codigo_autorizacion,i.foto_deposito,i.fecha_inscripcion,i.Hora_Inscripcion,i.estado,i.num_deposito,i.factura,i.id_idioma,i.fecha_Registro_de_validacion,i.Hora_Registro_Deposito,i.Hora_Validacion_Deposito,i.fecha_validacion_deposito,i.certificado_I,i.certificado_P,i.certificado_Autor,id.idioma	 FROM inscripcion i,idiomas id  WHERE i.id_idioma=id.id and id_per_pert = ?",
        [id]
      );
      if (games.length > 0) {
        return res.json(games[0]);
      }
      res.status(404).json({ text: "Inscripción no existe" });
    } catch (error) {}
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO inscripcion set ?", [
        req.body,
      ]);
      const id = await pool.query(
        "Select id from inscripcion where  id_per_pert = ?",
        [req.body.id_per_pert]
      );
      res.json(id);
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE inscripcion set ? WHERE id_per_pert = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Inscripción actualizada" });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM inscripcion WHERE id = ?", [id]);
      res.json({ message: "Inscripción  eliminada" });
    } catch (error) {}
  }
}

const inscripcionController = new InscripcionController();
export default inscripcionController;
