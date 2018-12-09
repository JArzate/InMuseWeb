import { API_URL, HTTPOptions } from './../../config/config';
import { PreguntaModelo } from './../../modelos/pregunta-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  constructor(public http:HttpClient) { }
  
  guardarPreguntas = (preguntas:Array<PreguntaModelo>,idMuseo:string) => {  
    return this.http.put(API_URL+"/adminPreguntas",{arrayModeloPreguntas:preguntas,idMuseo:idMuseo},HTTPOptions).toPromise();
  }

  getPreguntasMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/adminPreguntas/" + idMuseo).toPromise();
  }

}
