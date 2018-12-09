import { PistaModelo } from './../../modelos/pista-model';
import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecorridoModelo } from 'src/modelos/recorrido-modelo';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  constructor(private http:HttpClient) { }

  nuevaRecorrido = (recorrido:RecorridoModelo) => {
    delete recorrido._id;
    recorrido.arrayModeloPista.forEach((pista:PistaModelo)=>{
      delete pista.strImagen;
    });
    return this.http.post(API_URL + "/recorrido",{modeloRecorrido:recorrido},HTTPOptions).toPromise();
  }

  getRecorrido = (idRecorrido:string) => {
    return this.http.get(API_URL + "/recorrido/" + idRecorrido ,HTTPOptions).toPromise();
  }

  getRecorridosMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/museoListaRecorridos/" + idMuseo).toPromise();
  }

  updateRecorrido = (recorrido:RecorridoModelo) =>  {   
    recorrido.arrayModeloPista.forEach((pista:PistaModelo)=>{
      delete pista.strImagen;
    });
    return this.http.put(API_URL + "/recorrido",{modeloRecorrido:recorrido},HTTPOptions).toPromise();
  }
}
