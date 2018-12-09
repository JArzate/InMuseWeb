export class EventoModelo{
    _id?:string;
    strIdMuseo:string ="";
    strNombre:string ="";
    strDescripcion:string="";
    dteCreacion:Date = new Date();
    arrayStrImagen:Array<string> = new Array();
    blnDestacadaMuseo:boolean = false;
    blnActivo: boolean = true;
        
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}