import { Request, Response } from "express";
import pdf, { CreateOptions } from "html-pdf";
import QRCode from "qrcode";
import pool from "../database";
import keys from '../keys';
class ExpositorController {

  public async list(req: Request, res: Response): Promise<void> {
    try {
      const games = await pool.query(
        `SELECT a.id,  CONCAT(a.Nombre1,' ',a.Apellido1) as nombre, p.titulo,a.certificado_A,p.id_paper  FROM inscripcion as i, paper as p, autores as a where i.id=p.id_inscripcion AND p.id=a.id_paper_per AND a.expositor=true AND i.estado='V'`
      );
      res.json(games);
    } catch (error) {}
  }
  public async ExpositorPaper(req: Request, res: Response): Promise<void> {
    const {id}=req.params;
    console.log(id)
    try {
      const games = await pool.query(
        `SELECT a.id,  CONCAT(a.Nombre1,' ',a.Apellido1) as nombre, p.titulo,a.certificado_A,p.id_paper  FROM inscripcion as i, paper as p, autores as a where i.id=p.id_inscripcion AND p.id=a.id_paper_per AND a.expositor=true AND i.estado='V' AND a.id_paper_per=${id};`
      );

      res.json(games);
    } catch (error) {}
  }
  

  public async crearCertificado(req: Request, res: Response): Promise<void> {
    try {
      const { id, nombre, titulo,id_paper } = req.body;
      const URlprincipal =keys.urlCertificados.url;
      const URLFondo = "http://localhost:3000"  + "/public/certificados/EXPOSITOR.PNG";
      const URLRuta =
        URlprincipal + `/public/certificadosExpositores/${id_paper + nombre}.pdf`;
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
                  top: 50%;
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
                <h2>${nombre}</h2>
              
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
            `./public/certificadosExpositores/${id_paper+nombre}.pdf`,
            function (err, res) {
              if (err) {
              } else {
              }
            }
          );
        const ruta = `public/certificadosExpositores/${id_paper+nombre}.pdf`;
        const certificado = {
          certificado_A: ruta,
        };
        pool.query(`UPDATE autores set ? WHERE id = ?`, [certificado, id]);
        res.json({ message: "El comite fue actualizado" });
      });
    } catch (error) {}
  }

}

const expositorController = new ExpositorController();
export default expositorController;
