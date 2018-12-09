import { API_URL } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public http:HttpClient) { }
  getFeedbackMuseo = (idMuseo:string,strTipo:string,strColeccion:string = " ",strEmocion:string = " ",dteInicio:any = 0,dteFin:any = 0) => {
    return this.http.get(API_URL + "/feedback/" + idMuseo + "/" +strTipo + "/" +strColeccion + "/" +strEmocion + "/" + dteInicio + "/" + dteFin).toPromise();
  }
}
