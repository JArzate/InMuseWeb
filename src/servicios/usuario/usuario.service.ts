import { API_URL, HTTPOptions } from '../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) { }

  logIn = (correo:string,password:string) => {
    return this.http.post(API_URL + "/login",{strCorreo:correo,strPassword:password},HTTPOptions).toPromise();
  }
 
}
