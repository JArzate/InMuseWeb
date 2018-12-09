// var usuario = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     strApellido: Joi.string(),
//     strCorreo: Joi.string(),
//     dteNacimiento: Joi.date(),
//     strPassword: Joi.string(),
//     intPuntaje: Joi.number()
// }).required();

export class UsuarioModelo{
    _id:string;
    strNombre:string = "";
    strApellido?:string = "";
    strCorreo:string = "";
    dteNacimiento:Date = new Date(); 
    strPassword:string = "";
    intPuntaje?:number = 0;
    strRol:string = "usuario";
    blnPremium:boolean = false;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}