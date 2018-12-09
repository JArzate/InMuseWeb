import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  
  constructor(public http:HttpClient) { }

  filtroEncuesta = (idMuseo:string,fechaInicio:any = 0, fechaFin:any = 0) => {
    return this.http.get(API_URL+"/encuesta/" + idMuseo + "/" + fechaInicio + "/" + fechaFin,HTTPOptions).toPromise();
  }

  
}
