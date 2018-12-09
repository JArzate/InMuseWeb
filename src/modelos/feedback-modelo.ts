import { PreguntaModelo } from './pregunta-model';
// var feedback = Joi.object().keys({
//     _id: Joi.string().min(24),
//     intCalificacion: Joi.string(),
//     strComentario: Joi.string(),
//     strEmocion: Joi.string(),
//     arrayPreguntas: Joi.array().items(pregunta)
// }).required();


export class FeedBackModelo{
    _id?:string;
    strIdMuseo:string;
    strColeccion:string;
    strIdColeccion:string;
    dteCreacion:Date = new Date();
    strEmocion:string;
    strComentario?:string;
    arrayPreguntas?: Array<PreguntaModelo> =  [];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}