import { HttpClient } from '@angular/common/http';
import { API_URL, HTTPOptions } from './../../config/config';
import { Injectable } from '@angular/core';
import { ObraModelo } from 'src/modelos/obra-model';

@Injectable({
  providedIn: 'root'
})
export class ObraService {
    constructor(public http:HttpClient) { }
  
    nuevaObra = (obra:ObraModelo) => {  
      delete obra._id;
      delete obra.arrayModeloArtista;
      return this.http.post(API_URL+"/obra",{modeloObra:obra},HTTPOptions).toPromise();
    }

    getObra = (idObra:string) => {
      return this.http.get(API_URL + "/obra/" + idObra).toPromise();
    }

    getObrasMuseo = (idMuseo:string) => {
      return this.http.get(API_URL + "/museoListaObras/" + idMuseo).toPromise();
    }

    updateObra = (obra:ObraModelo) =>  {
      delete obra.arrayModeloArtista;

      return this.http.put(API_URL + "/obra",{modeloObra:obra},HTTPOptions).toPromise();
    }
    
}
