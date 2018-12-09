import { PreguntaModelo } from './pregunta-model';
import { SalaModelo } from './sala-model';
import { ArtistaModelo } from './artista-model';
import { ObraModelo } from 'src/modelos/obra-model';
// // Campos en front
// // arrayModeloObra
// // arrayModeloArtista
// var museo = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     strDescripcion: Joi.string(),
//     strAudioDescripcion: Joi.string(),
//     dteCreacion: Joi.date(),
//     arrayStrNombreFundador: Joi.array().items(Joi.string()),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     arrayStrIdFeedback: Joi.array().items(Joi.string()),
//     arrayStrIdObra: Joi.array().items(Joi.string()),
//     arrayStrIdArtista: Joi.array().items(Joi.string()),
//     blnActivo: Joi.boolean()
// }).required();

export class MuseoModelo{
    _id?:string = "";
    strNombre:string = "";
    strDescripcion:string = "";
    strAudioDescripcion?:string = "";
    dteCreacion:Date = new Date();
    arrayStrNombreFundador:Array<string> = [''];
    arrayStrDatosCuriosos?:Array<string> = [''];
    arrayStrImagen:Array<string> = new Array();
    arrayStrIdArtista?:Array<string> = new Array();
    arrayModeloPreguntas?:Array<PreguntaModelo> = new Array();
    blnActivo: boolean = true;
    arrayModeloObra : Array<ObraModelo>
    arrayModeloArtista : Array<ArtistaModelo>
    arrayModeloSala : Array<SalaModelo>;
    dblLatitud:number;
    dblLongitud:number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}