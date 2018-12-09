import { API_URL, HTTPOptions } from './../../config/config';
import { EventoModelo } from 'src/modelos/evento-modelo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(public http:HttpClient) { }

  nuevoEvento = (evento:EventoModelo) => {

    delete evento._id;

    return this.http.post(API_URL+"/evento",{modeloEvento:evento},HTTPOptions).toPromise();
  }

  getEvento = (idMuseo:string) => {
    return this.http.get(API_URL + "/evento/"+idMuseo,HTTPOptions).toPromise();
  }

  updateEvento = (museo:EventoModelo) =>  {
    return this.http.put(API_URL + "/evento",{modeloEvento:museo},HTTPOptions).toPromise();
  }

  getEventosMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/museolistaEventos/" + idMuseo).toPromise();
  }

}
