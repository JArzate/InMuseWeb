export class PistaModelo{
    strIdObra:string ="" ;
    intPuntos:number=0;
    strPista:string="";
    strImagen:string="";

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}