import { Request, Response } from "express";
import pdf, { CreateOptions } from "html-pdf";
import QRCode from "qrcode";
import fs from "fs";

import pool from "../database";
import keys from '../keys';
class CertificadoCController {
  public async crearCertificado(req: Request, res: Response): Promise<void> {
    try {
      const { id, nombre } = req.body;
      const URlprincipal = keys.urlCertificados.url;
      const URLFondo = "http://localhost:3000" + "/public/certificados/COMITE.PNG";
      const URLRuta = URlprincipal + `/public/certificadosComite/${nombre}.pdf`;
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
                top: 53%;
                left: 30%;
        
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
              <h1>${nombre}</h1>
            
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
            `./public/certificadosComite/${nombre}.pdf`,
            function (err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log(res);
              }
            }
          );
        const ruta = `public/certificadosComite/${nombre}.pdf`;
        const comiteGuardar = {
          certificado_C: ruta,
        };
        pool.query(`UPDATE comite set ? WHERE id = ?`, [comiteGuardar, id]);
        res.json({ message: "El comite fue actualizado" });
      });
    } catch (error) {}
  }
}
const certificadoCController = new CertificadoCController();
export default certificadoCController;
