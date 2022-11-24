import { Request, Response } from "express";
import pdf, { CreateOptions } from "html-pdf";
import QRCode from "qrcode";
import pool from "../database";
import keys from '../keys';
class AutoresController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query(
        `Select i.id, pe.documento_identificacion as ci, CONCAT(pe.nom_paterno , ' ' ,pe.nom_materno , ' ' ,pe.ape_paterno ,' ' ,pe.ape_materno) nombre,pa.id paper_id ,tp.tipo, pa.titulo, pa.certificado   from persona pe , inscripcion i, paper pa, tipopaper tp WHERE pe.id=i.id_per_pert  and i.id=pa.id_inscripcion and tp.id =pa.id_tipopaper and i.estado='V'`
      );
      res.json(games);
    } catch (error) {}
  }
  public async AutoresPaper(req: Request, res: Response): Promise<void> {
    const {idPaper}=req.body;
    try {
      const games = await pool.query(
        `SELECT Nombre1,Apellido1,expositor,paga, id as id from autores where id_paper_per=${idPaper};`
      );
      res.json(games);
    } catch (error) {}
  }
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("INSERT INTO autores set ?", [req.body]);
      res.json(result);
    } catch (error) {}
  }

  public async actualizarAutor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await pool.query("UPDATE autores set ? WHERE id = ?", [
        req.body,
        id,
      ]);
      res.json({ message: "Editado" });
    } catch (error) {}
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id, nombre, titulo } = req.body;
      const URlprincipal = keys.urlCertificados.url;
      const URLFondo = "http://localhost:3000" + "/public/certificados/autores.PNG";
      const URLRuta =
        URlprincipal + `/public/certificadosAutores/${id}.pdf`;
      QRCode.toDataURL(URLRuta, function (err, url) {
        const pdfv = `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>PDF Result Template</title>
             
              <style>
                h1 {
                  color: black;
                  text-transform: uppercase;
                  font-size: 35px;
                }
                .fondo {
                  background: url("${URLFondo}")
                    0 0/100% 100% no-repeat !important;
                  height: 210mm;
                  width: 297mm;
                  position: relative;
                }
                .nombre {
                  width: 100%;
                  height: 50px;
                  position: absolute;
                  top: 47%;
                  left: 30%;
          
                  margin: -25px 0 0 -25px;
                }
                .titulo {
                    width: 100%;
                    height: 50px;
                    position: absolute;
                    top: 54%;
                    left: 22%;
            
                    margin: -25px 0 0 -25px;
                  }
                  .canvas {
                    width: 110px;
                    height: 110px;
                    /* centrado vertical */
                    position: absolute;
                    top: 3%;
                    left: 112%;
                    margin-top: -25px;
                  }
                img{
                  width:100%;
                  height:100%;
                }
              </style>
              <script type="text/javascript" src="qrcode.js"></script>
            </head>
            <body class="fondo">
              <div class="nombre">
                <h3>${nombre}</h3>
              
              </div>
              <div class="titulo">
              <h3>${titulo}</h3>
            
            </div>
              <div class="canvas">
              <img src="${url}"> 
             </div>
            </body>
          </html>`;

        const options: CreateOptions = {
          format: "A4",
          orientation: "landscape",
        };

        pdf
          .create(pdfv, options)
          .toFile(
            `./public/certificadosAutores/${id}.pdf`,
            function (err, res) {
              if (err) {
              } else {
              }
            }
          );
        const ruta = `public/certificadosAutores/${id}.pdf`;
        const autorGuardar = {
          certificado: ruta,
        };
        pool.query(`UPDATE paper set ? WHERE id = ?`, [autorGuardar, id]);
        res.json({ message: "El comite fue actualizado" });
      });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM autores WHERE id = ?", [id]);
    res.json({ message: "El autor" });
  }
}

const autoresController = new AutoresController();
export default autoresController;
