import { API_URL, HTTPOptions } from './../../config/config';
import { ArtistaModelo } from './../../modelos/artista-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(public http:HttpClient) { }

  nuevoArtista = (artista:ArtistaModelo) => {

    delete artista._id;

    return this.http.post(API_URL+"/artista",{modeloArtista:artista},HTTPOptions).toPromise();
  }

  getArtista = (idMuseo:string) => {
    return this.http.get(API_URL + "/artista/"+idMuseo,HTTPOptions).toPromise();
  }

  updateArtista = (artista:ArtistaModelo) =>  {
    return this.http.put(API_URL + "/artista",{modeloArtista:artista},HTTPOptions).toPromise();
  }

  getArtistasMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/museolistaArtistas/" + idMuseo).toPromise();
  }

}
