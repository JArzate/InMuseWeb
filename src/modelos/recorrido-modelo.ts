import { PistaModelo } from './pista-model';
export class RecorridoModelo{
    _id:string;
    strIdMuseo:string = "";
    arrayModeloPista:Array<PistaModelo>;
    dteCreacion:Date = new Date();
    strNombre:string = "";
    strDescripcion:string = "";

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}