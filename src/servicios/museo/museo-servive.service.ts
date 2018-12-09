import { HttpClient } from '@angular/common/http';
import { MuseoModelo } from 'src/modelos/museo-model';
import { API_URL, HTTPOptions } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuseoServiveService {

  constructor(public http:HttpClient) { }

  nuevoMuseo = (museo:MuseoModelo) => {
    delete museo.arrayModeloSala;
    delete museo.arrayModeloObra;
    delete museo.arrayModeloArtista;
    delete museo.arrayModeloPreguntas;
    delete museo._id;

    return this.http.post(API_URL+"/museo",{modeloMuseo:museo},HTTPOptions).toPromise();
  }

  getMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/museo/"+idMuseo,HTTPOptions).toPromise();
  }

  updateMuseo = (museo:MuseoModelo) =>  {
    delete museo.arrayModeloArtista;
    delete museo.arrayModeloObra;
    delete museo.arrayModeloSala;
    delete museo.arrayModeloPreguntas;

    return this.http.put(API_URL + "/museo",{modeloMuseo:museo},HTTPOptions).toPromise();
  }

  getMuseos = (idUsuario:string) => {
    return this.http.get(API_URL + "/listaMuseo/" + idUsuario).toPromise();
  }
  
  

}
