import { API_URL } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(public http: HttpClient) { }

  getEstadisticas = (idMuseo: string, ano: boolean = true, mes: boolean = false, fechaInicio: any = 0, fechaFin: any = 0) => {
    return this.http.get(API_URL + "/estadisticas/" + idMuseo + "/" + ano + "/" + mes + "/" + fechaInicio + "/" + fechaFin).toPromise();
  }
}
