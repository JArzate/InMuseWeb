import { HttpClient } from '@angular/common/http';
import { API_URL, HTTPOptions } from './../../config/config';
import { SalaModelo } from 'src/modelos/sala-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(private http:HttpClient) { }

  nuevaSala = (sala:SalaModelo) => {
    delete sala.arrayModeloArtista;
    delete sala.arrayModeloObra;
    delete sala._id;

    return this.http.post(API_URL+"/sala",{modeloSala:sala},HTTPOptions).toPromise();
  }

  getSala = (idSala) => {
    return this.http.get(API_URL+"/sala/" + idSala ,HTTPOptions).toPromise();
  }

  getSalasMuseo = (idMuseo:string) => {
    return this.http.get(API_URL + "/museoListaSalas/" + idMuseo).toPromise();
  }

  updateSala = (sala:SalaModelo) =>  {
    delete sala.arrayModeloArtista;
    delete sala.arrayModeloObra;
    
    return this.http.put(API_URL + "/sala",{modeloSala:sala},HTTPOptions).toPromise();
  }
}
