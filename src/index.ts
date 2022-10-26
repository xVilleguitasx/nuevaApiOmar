import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import carrerasRoutes from './routes/carrerasRoutes';
import semestresRoutes from './routes/semestresRoutes';
import personasRoutes from './routes/personasRoutes';
import identificacionRoutes from './routes/identificacionRoutes';
import paraleloRoutes from './routes/paraleloRoutes';
import tipoPaperRoutes from './routes/tipoPaperRoutes';
import idiomaRoutes from './routes/idiomaRoutes';
import pagoRoutes from './routes/pagoRoutes';
import tipoInscripcionRoutes from './routes/tipoInscripcionRoutes';
import inscripcionRoutes from './routes/inscripcionRoutes';
import verificarRoutes from './routes/verificarRoutes';
import adminInscripRoutes from './routes/adminInscripRoutes';
import paperRoutes from './routes/paperRoutes';
import facturaRoutes from './routes/facturaRoutes';
import configuracionRoutes from './routes/configuracionRoutes';
import patrocinadorRoutes from './routes/patrocinadorRoutes';
import registroInformacionRoutes from './routes/registroInformacionRoutes';
import edicionRoutes from './routes/edicionRoutes';
import comiteRoutes from './routes/comiteRoutes';
import tipoComiteRoutes from './routes/tipoComiteRoutes';
import investigadorRoutes from './routes/investigadorRoutes';
import informacionCongresoRoutes from './routes/informacionCongresoRoutes';
import imagenesPortadaRoutes from './routes/imagenesPortadaRoutes';
import authRoutes from './routes/authRoutes';
import confiReportesRoutes from './routes/confiReportesRoutes';
import eliminarArchivosRoutes from './routes/eliminarArchivosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import galeriaInformacionRoutes from './routes/galeriaInformacionRoutes';
import galeriaLugarRoutes from './routes/galeriaLugarRoutes';
import presentacionRoutes from './routes/presentacionRoutes';
import informacionTutisticaRoutes from './routes/informacionTutisticaRoutes';
import lugarDelEventoRoutes from './routes/lugarDelEventoRoutes';
import programaRoutes from './routes/programaRoutes';
import envioTrabajosRoutes from './routes/envioTrabajosRoutes';
import envioTrabajosFormatosRoutes from './routes/envioTrabajosFormatosRoutes';
import envioTrabajosFechaRoutes from './routes/envioTrabajosFechaRoutes';
import temarioRoutes from './routes/temarioRoutes';
import temarioTemasRoutes from './routes/temarioTemasRoutes';
import inicioRoutes from './routes/inicioRoutes';
import inicioGaleriaRoutes from './routes/inicioGaleriaRoutes';
import programaDetalleRoutes from './routes/programaDetalleRoutes';
import programaJornadaRoutes from './routes/programaJornadaRoutes';
import programaDiasRoutes from './routes/programaDiasRoutes';
import mailerRoutes from './routes/mailerRoutes';
import tipoUsuarioRoutes from './routes/tipoUsuarioRoutes';
import certificadosPRoutes from './routes/certificadosParticipacionRoutes';
import certificadosCRoutes from './routes/certificadosComiteRoutes';
import autoresRoutes from './routes/certificadosAutoresRoutes';
import certificadosAsistenciaRoutes from './routes/certificadosAsistenciaRoutes';
import expositorRoutes from './routes/expositorRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    } 
 
    routes(): void {
        
        this.app.use('/carreras', carrerasRoutes);
        this.app.use('/semestres', semestresRoutes);
        this.app.use('/personas', personasRoutes    );
        this.app.use('/identificacion', identificacionRoutes);
        this.app.use('/paralelo', paraleloRoutes);
        this.app.use('/tipoPaper', tipoPaperRoutes);
        this.app.use('/idioma', idiomaRoutes);
        this.app.use('/pago', pagoRoutes);
        this.app.use('/paper', paperRoutes);
        this.app.use('/tipoInscripcion', tipoInscripcionRoutes);
        this.app.use('/inscripcion', inscripcionRoutes);
        this.app.use('/verificar', verificarRoutes);
        this.app.use('/adminInscrip', adminInscripRoutes);
        this.app.use('/factura', facturaRoutes);
        this.app.use('/configuracion', configuracionRoutes);
        this.app.use('/patrocinador', patrocinadorRoutes);
        this.app.use('/infoRegistro', registroInformacionRoutes);
        this.app.use('/edicion', edicionRoutes);
        this.app.use('/comite', comiteRoutes);
        this.app.use('/tipoComite', tipoComiteRoutes);
        this.app.use('/investigador', investigadorRoutes); 
        this.app.use('/informacionCongreso', informacionCongresoRoutes); 
        this.app.use('/imagenesPortada', imagenesPortadaRoutes); 
        this.app.use('/auth', authRoutes); 
        this.app.use('/confiReportes', confiReportesRoutes); 
        this.app.use('/eliminarArchivos', eliminarArchivosRoutes); 
        this.app.use('/usuarios', usuariosRoutes); 
        this.app.use('/galeriaLugar', galeriaLugarRoutes); 
        this.app.use('/galeriaInformacion', galeriaInformacionRoutes); 
        this.app.use('/informacionTuristica', informacionTutisticaRoutes); 
        this.app.use('/presentacion', presentacionRoutes); 
        this.app.use('/lugarDelEvento', lugarDelEventoRoutes);  
        this.app.use('/programa', programaRoutes);  
        this.app.use('/envioTrabajos', envioTrabajosRoutes); 
        this.app.use('/envioTrabajosFormatos', envioTrabajosFormatosRoutes); 
        this.app.use('/envioTrabajosFechas', envioTrabajosFechaRoutes);  
        this.app.use('/temario', temarioRoutes);  
        this.app.use('/temarioTemas', temarioTemasRoutes);  
        this.app.use('/inicio', inicioRoutes);  
        this.app.use('/inicioGaleria', inicioGaleriaRoutes);  
        this.app.use('/programaDetalle', programaDetalleRoutes);  
        this.app.use('/programaJornada', programaJornadaRoutes);  
        this.app.use('/programaDias', programaDiasRoutes);  
        this.app.use('/usuarios', usuariosRoutes);  
        this.app.use('/mailer', mailerRoutes); 
        this.app.use('/tipoUsuario', tipoUsuarioRoutes);  
        this.app.use('/certificadosP', certificadosPRoutes); 
        this.app.use('/certificadosC', certificadosCRoutes); 
        this.app.use('/autores', autoresRoutes);  
        this.app.use('/certificadosAsistencia', certificadosAsistenciaRoutes);  
        this.app.use('/expositor', expositorRoutes);  
       // this.app.use('/certificados', certificadoController);
       this.app.use('/public/comprobantes', express.static(path.resolve('public/comprobantes'))); 
       this.app.use('/public/facturas', express.static(path.resolve('public/facturas'))); 
       this.app.use('/public/patrocinadores', express.static(path.resolve('public/patrocinadores'))); 
       this.app.use('/public/registro_informacion', express.static(path.resolve('public/registro_informacion'))); 
       this.app.use('/public/ediciones', express.static(path.resolve('public/ediciones'))); 
       this.app.use('/public/conferencistas', express.static(path.resolve('public/conferencistas'))); 
       this.app.use('/public/infoCongreso', express.static(path.resolve('public/infoCongreso'))); 
       this.app.use('/public/imagenesPortada', express.static(path.resolve('public/imagenesPortada'))); 
       this.app.use('/public/confiReportes', express.static(path.resolve('public/confiReportes'))); 
       this.app.use('/public/confiCertificados', express.static(path.resolve('public/confiCertificados'))); 
       this.app.use('/public/galeria', express.static(path.resolve('public/galeria'))); 
       this.app.use('/public/informacionTuristica', express.static(path.resolve('public/informacionTuristica'))); 
       this.app.use('/public/presentacion', express.static(path.resolve('public/presentacion'))); 
       this.app.use('/public/lugarDelEvento', express.static(path.resolve('public/lugarDelEvento'))); 
       this.app.use('/public/programa', express.static(path.resolve('public/programa'))); 
       this.app.use('/public/envioTrabajosFormatos', express.static(path.resolve('public/envioTrabajosFormatos'))); 
       this.app.use('/public/envioTrabajos', express.static(path.resolve('public/envioTrabajos'))); 
       this.app.use('/public/inicio', express.static(path.resolve('public/inicio'))); 
       this.app.use('/public/inicioGaleria', express.static(path.resolve('public/inicioGaleria'))); 
       this.app.use('/public/certificados', express.static(path.resolve('public/certificados'))); 
       this.app.use('/public/certificadosAsistencia', express.static(path.resolve('public/certificadosAsistencia'))); 
       this.app.use('/public/certificadosAutores', express.static(path.resolve('public/certificadosAutores'))); 
       this.app.use('/public/certificadosComite', express.static(path.resolve('public/certificadosComite'))); 
       this.app.use('/public/certificadosParticipacion', express.static(path.resolve('public/certificadosParticipacion')));
       this.app.use('/public/certificadosExpositores', express.static(path.resolve('public/certificadosExpositores')));  
        
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();