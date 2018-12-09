// var artista = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     dteNacimiento: Joi.date(),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     strAudioDescripcion: Joi.string(),
//     blnActivo: Joi.boolean()
// }).required();

export class ArtistaModelo{
    _id?:string;
    strIdMuseo:string;
    strNombre:string;
    dteNacimiento:Date = new Date();
    arrayStrDatosCuriosos?:Array<string> = [''];
    arrayStrImagen:Array<string> = new Array();
    strAudioDescripcion?: string;
    blnActivo: boolean = true;
    blnDestacadaMuseo:boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}