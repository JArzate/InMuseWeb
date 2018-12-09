import { ObraModelo } from './obra-model';
import { ArtistaModelo } from './artista-model';
// // Campos en front
// // arrayModeloArtista
// // arrayModeloObra
// var sala = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strIdMuseo: Joi.string(),
//     strNombre: Joi.string(),
//     strDescripcion: Joi.string(),
//     strAudioDescripcion: Joi.string(),
//     dteCreacion: Joi.date(),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     arrayStrIdFeedback: Joi.array().items(Joi.string()),
//     blnActivo: Joi.boolean()
// }).required();

export class SalaModelo{
    _id?:string;
    strIdMuseo:string;
    strNombre:string;
    strDescripcion:string;
    strAudioDescripcion?:string;
    dteCreacion:Date = new Date();
    arrayStrDatosCuriosos?:Array<string> = [""];
    arrayStrImagen:Array<string> = new Array();
    blnDestacadaMuseo:boolean = false;
    blnActivo: boolean = true;
    
    arrayModeloArtista:Array<ArtistaModelo> = Array();
    arrayModeloObra:Array<ObraModelo> = Array();
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}