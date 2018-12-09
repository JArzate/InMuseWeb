export class GraficaModelo{
    strTitulo:string;
    arrayY: Array<any> ;
    arrayX: Array<any>;
    arrayTipo: Array<string>;
    strTipo:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}