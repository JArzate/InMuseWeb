import { ArtistaModelo } from './artista-model';
// var obra = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strIdSala: Joi.string(),
//     strTitulo: Joi.string(),
//     arrayStrIdArtista: Joi.array().items(Joi.string()),
//     strDescripcion: Joi.string(),
//     strAudioDescripcion: Joi.string(),
//     strCorrienteArtistica: Joi.string(),
//     strTiempoHistorico: Joi.string(),
//     strMaterial: Joi.string(),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     dteCreacion: Joi.date(),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     arrayStrIdFeedback: Joi.array().items(Joi.string()),
//     blnActivo: Joi.boolean()
// }).required();

export class ObraModelo{
    _id?:string = "";
    strIdSala:string = "";
    strIdMuseo:string = "";
    strTitulo:string = "";
    arrayModeloArtista:Array<ArtistaModelo> = Array();
    arrayStrIdArtista:Array<string> = [''];
    strDescripcion:string = "";
    strAudioDescripcion?:string = "";
    arrayStrDatosCuriosos?:Array<string> = [""];
    dteCreacion:Date = new Date();
    arrayStrImagen:Array<string> = Array();
    blnActivo: boolean = true;
    blnDestacadaSala:boolean =false;
    blnDestacadaMuseo:boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}