import { Request, Response } from "express";
var nodeoutlook = require("nodejs-nodemailer-outlook");
const nodemailer = require("nodemailer");
class MailerController {
  public async MailInscritos(req: Request, res: Response): Promise<void> {
    const { mensaje, destinatario, asunto } = req.body;

    try {
      nodeoutlook.sendEmail({
        port: 587,
        auth: {
          user: "csei@uta.edu.ec",
          pass: "Congreso?2021",
        },
        from: "csei@uta.edu.ec",
        to: `${destinatario}`,
        subject: `${asunto}`,
        html: `${mensaje}`,
      });
      res.json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.json({ message: "error" });
    }
  }


  public async CreacionCertificado(ruta:string,destinatario:string,asunto:string){
    
    const mensaje = `
    <!DOCTYPE html>
<html>
<body style="text-align:center">

<p> Estimado participante su certificado de ${asunto} a sido generado  </p>
<p> Puedes contrarlo en la siguiente dirección:  </p>
<p> ${ruta}  </p>
<hr />
</body>
</html>
   
    `;
    try {
      nodeoutlook.sendEmail({
        port: 587,
        auth: {
          user: "csei@uta.edu.ec",
          pass: "Congreso?2021",
        },
        from: "csei@uta.edu.ec",
        to: `${destinatario}`,
        subject: `Certificado ${asunto}`,
        html: `${mensaje}`,
      });
   
    } catch (error) {
      console.log(error);
    
    }
  }


  public async MailRegistro(req: Request, res: Response): Promise<void> {
    const { nombre, ci, monto, destinatario, titulo, fecha, edicion , idioma} = req.body;
    console.log(req.body);
      let mensaje="";
      if(idioma==="SPANISH"){
         mensaje = `
        <!DOCTYPE html>
  <html>
  <body>
  
  <p style="font-weight: bold;"> Querido participante, </p>
   
  <br />
  ${nombre} <br />
  DI: ${ci} <br />
  <br />
  Nos complace confirmar su preinscripción en el "${titulo}", que se realizará en Ambato,${fecha} en la Universidad Técnica de Ambato. <br />
  Para completar el registro, usted debe completar algunos pasos.<br />
  1.	Realizar un depósito o transferencia bancaria. Por favor, consulte la información a continuación 
  para hacer el correspondiente depósito/transferencia. Tenga en cuenta que el comprobante original de 
  depósito o transferencia bancaria debe conservarlo. 
  <br />
  2.	Subir el comprobante de depósito bancario escaneado para validar su registro en línea. 
  <a href="https://csei.uta.edu.ec/csei2022/#/validacion">Aqui. </a>
  Una vez subido el comprobante le llegara un correo con un enlace en el cual es necesario inscribirse para recibir las sesiones a realizarse en el congreso. 
  <br />
  3.	<span style="color: red"> Al momento de realizar transferencia bancaria registrar el correo electrónico 
  analistafinancieroutaep@uta.edu.ec para la validación de su inscripción.</span> 
  <br />
  <hr />
  <p style="font-weight: bold;">Información para el depósito bancario: </p>
  <br />
 •	Nombre del Banco: Banco del Austro S.A.<br />
 •	Institución: Empresa Pública de la Universidad Técnica de Ambato UTA-EP<br />
 •	Tipo de Cuenta: Corriente<br />
 •	Número de Cuenta: #518233793<br />
 •	Monto:$ ${monto}<br /><br />
 <hr />
  <p style="font-weight: bold;">Información Adicional:  </p>
 <br />
 •	Sublínea: 14.03.99 (A veces el banco lo requiere)<br />
 •	RUC: 1865042910001<br /><br />
 <hr />
 <br />
 <p style="font-weight: bold;">Transferencia internacional,Banco Intermediario y código SWIFT:  </p>
 <br />
 •	Banco Intermediario: Citibank New York<br />
   •	Swift: CITIUS33<br />
 •	Banco Beneficiario: Banco del Austro S.A.<br />
   •	Swift: AUSTECEQ<br />
  <br />
  <hr />
  Muchas gracias y nos vemos en ${edicion}! <br />
  </body>
  </html>
        `;
      }else{
        mensaje = `
        <!DOCTYPE html>
  <html>
  <body>
  
  <p style="font-weight: bold;"> Dear Participant, </p>
   
  <br />
  ${nombre} <br />
  DI: ${ci} <br />
  <br />
  We are glad to confirm your pre-registration to "${titulo}", to be held in Ambato, ${fecha} at Universidad Técnica de Ambato. <br />
  In order to complete the registration, you must follow some steps: 
  <br />
  1.	To do a bank deposit / transfer to the bank account of the conference. Please, consult the
  following information for making the deposit / transfer. Note that the original
  bank slip must be kept.
  <br />
  2.	To upload the bank slip scanned for validating your online registration.
  <a href="https://csei.uta.edu.ec/csei2022/#/validacion">Here.</a>
  Once the bank receipt is uploaded, you will receive an email with a link in which it is necessary
   to register to receive the sessions to be held at the congress.
   <br />
  3.	<span style="color: red"> When making a bank transfer, register the email 
  analyistafinancieroutaep@uta.edu.ec to validate your registration.</span> <br />
  <br />
  <hr />
   <p style="font-weight: bold;"> Information for the bank deposit: </p>
   <br />
  •	Bank Name: Banco del Austro S.A.<br />
  •	Institution: Empresa Pública de la Universidad Técnica de Ambato UTA-EP<br />
  •	Account type:Corriente<br />
  •	Account number: #518233793<br />
  •	Amount:$ ${monto}<br /><br />
  <hr />
   <p style="font-weight: bold;">  Additional Information: </p>
  <br />
  •	Sublínea: 14.03.99 (sometimes the bank requires it)<br />
  •	RUC: 1865042910001<br /><br />
  <hr />
  <br />
  <p style="font-weight: bold;">International transfer, Intermediary Bank and SWIFT code:  </p>
  <br />
  • Intermediary Bank: Citibank New York<br />
    •	Swift: CITIUS33<br />
  •	Beneficiary Bank: Banco del Austro S.A.<br />
    •	Swift: AUSTECEQ<br />

  <hr />
  Thank you very much and see you in ${edicion}! <br />
  </body>
  </html>
        `;
      }
   
    try {
      nodeoutlook.sendEmail({
        auth: {
          user: "csei@uta.edu.ec",
          pass: "Congreso?2021",
        }, 
        from: "csei@uta.edu.ec",
        to: `${destinatario}`,
        subject: `CSEI 2022`,
        html: `${mensaje}`,
      });
      res.json({ message: "ok" });
      console.log("ok")
    } catch (error) {
      console.log(error);
      res.json({ message: "error" });
    }
  }
 

  public async MailVerificación(req: Request, res: Response): Promise<void> {
    const { destinatario, edicion,idioma } = req.body;
    let mensaje="";
   if(idioma==='SPANISH'){
    mensaje = `
    <!DOCTYPE html>
<html>
<body style="text-align:center">

<p> Su comprobante de depósito/transferencia ha sido validado con éxito.  </p>
<p> Es necesario inscribirse en el siguiente enlace para recibir las sesiones a realizarse en el congreso:  </p>
<p> https://cedia.zoom.us/webinar/register/WN_NTEPF-uMQeiIlw4haJ86Qw  </p>
<hr />
<p>¡Nos vemos en ${edicion}!  </p>
</body>
</html>
   
    `;
   }else{
    mensaje =`
    <!DOCTYPE html>
<html>
<body style="text-align:center">

<p> Your transfer/deposit slip  has been  successfully validated.  </p>
<p> It is necessary to register in the following link to receive the sessions to be held at the congress:  </p>
<p> https://cedia.zoom.us/webinar/register/WN_NTEPF-uMQeiIlw4haJ86Qw  </p>
<hr />
<p>¡Thank you very much and see you in  ${edicion}!  </p>
</body>
</html>
   
    `
   }
    
        try {
          nodeoutlook.sendEmail({
            auth: {
              user: "csei@uta.edu.ec",
              pass: "Congreso?2021",
            },
            from: "csei@uta.edu.ec",
            to: `${destinatario}`,
            subject: `CSEI 2022`,
            html: `${mensaje}`,
          });
          res.json({ message: "ok" });
        } catch (error) {
          console.log(error);
          res.json({ message: "error" });
        }
  }

  public async MailSubidaTiket(req: Request, res: Response): Promise<void> {
    const { destinatario, edicion,idioma } = req.body;
    let mensaje="";
    if(idioma==="SPANISH"){
      mensaje = `
      <!DOCTYPE html>
  <html>
  <body style="text-align:center">
  <hr />
  <p> Muchas gracias por su pago. Su comprobante de depósito/transferencia está siendo validado. Usted será notificado por correo electrónico.  </p>
  <hr />
  <p>¡Nos vemos en  ${edicion}!</p>
  </body>
  </html>
     
      `;
    }else{
      mensaje =`
      <!DOCTYPE html>
  <html>
  <body style="text-align:center">
  <hr />
  <p> 
  Thank you very much for your payment. Your transfer/deposit slip  is been validated. You will be notified by email.
  </p>
  <hr />
  <p>¡Thank you very much and see you in   ${edicion}!</p>
  </body>
  </html>
     
      `
    }


    try {
      nodeoutlook.sendEmail({
        auth: {
          user: "csei@uta.edu.ec",
          pass: "Congreso?2021",
        },
        from: "csei@uta.edu.ec",
        to: `${destinatario}`,
        subject: `CSEI 2022`,
        html: `${mensaje}`,
      });
      res.json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.json({ message: "error" });
    }
  }
}

const mailerController = new MailerController();
export default mailerController;
