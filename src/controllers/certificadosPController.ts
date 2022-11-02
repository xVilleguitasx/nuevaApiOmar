import { Request, Response } from "express";
import pdf, { CreateOptions } from "html-pdf";
import fs from 'fs';
import QRCode from 'qrcode';
import pool from "../database";
import keys from '../keys';
import mailerController from "./mailerController";
class CertificadoPController {
  public async crearCertificado(req: Request, res: Response): Promise<void> {
    try {
      
    
  const {id, nombre,cedula,correo } = req.body; 
  const URlprincipal = keys.urlCertificados.url;
  const URLFondo = URlprincipal +"/public/certificados/PARTICIPACION.PNG";
  const URLRuta= URlprincipal +`/public/certificadosParticipacion/${cedula}.pdf`
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
        background: url("${URLFondo }")
          0 0/100% 100% no-repeat !important;
        height: 210mm;
        width: 297mm;
        position: relative;
      }
      .nombre {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 54%;
        left: 35%;

        margin: -25px 0 0 -25px;
      }
      .canvas {
        width: 125px;
        height: 125px;
        /* centrado vertical */
        position: absolute;
        top: 3%;
        left: 105%;
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
  
  pdf.create(pdfv, options).toFile(`./public/certificadosParticipacion/${cedula}.pdf`, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  const ruta = `public/certificadosParticipacion/${cedula}.pdf`
  const adminInscripGuardar = {
    certificado_P:ruta
  }
  pool.query(`UPDATE inscripcion set ? WHERE id = ?`, [adminInscripGuardar, id]);
  mailerController.CreacionCertificado(URLRuta,correo,"Participación");
  res.json({ message: "La inscripcion fue actualizada" });
  })
} catch (error) {
      
}
  }
  

}
const certificadoPController = new CertificadoPController();
export default certificadoPController;
