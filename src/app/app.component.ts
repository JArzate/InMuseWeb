import { DatePipe } from '@angular/common';
import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioService } from '../servicios/usuario/usuario.service';
import { UsuarioModelo } from './../modelos/usuario-model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import Swal  from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titulo:string =  "Administración";
  user: UsuarioModelo;
  museo:MuseoModelo;
  form: FormGroup;
  loader:boolean;
  strCorreo:string = "";
  strPassword:string = "";

  constructor( public datePipe: DatePipe,private formBuilder: FormBuilder, public _route: ActivatedRoute, public _router: Router, public usuarioService:UsuarioService) {
    this.loader = false;
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required,Validators.email]],
      contrasena: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('usuario')) {
      let usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.user = new UsuarioModelo(usuario);
      
      if(sessionStorage.getItem('museo')){
        this.museo = JSON.parse(sessionStorage.getItem('museo'));
      }
    }else{
      this.user = null;
      this.museo = null;
    }    
  }


  Login = () => {
    this.loader = true;
    this.usuarioService.logIn(this.strCorreo,this.strPassword).then((response:any)=>{
      this.loader = false;
      
      if (response.intStatus == 1){
        if (response.jsnAnswer.modeloUsuario){
          this.user = response.jsnAnswer.modeloUsuario;
          sessionStorage.setItem("usuario",JSON.stringify(this.user));
          if (this.user.strRol == "admin"){
            this.museo = response.jsnAnswer.modeloMuseo;
            sessionStorage.setItem("museo",JSON.stringify(this.museo));
          }else if (this.user.strRol == "superadmin"){
            this.museo = new MuseoModelo();
          }else{
            
          } 
        }
        
      }else{
        Swal({
          title:"¡Upss!",
          text:response.strAnswer,
          type: "warning"
        });
      }

    }).catch((error)=>{
      console.log(error);
      
    });
  }

  logOut =  () => {
    this.user = null;
    this.museo = null;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('museo');
  }

  userCan = (roles:any) => {
    var index;
    if(Array.isArray(roles)){    
      index = roles.findIndex((rol:string)=>{
        return this.user.strRol === rol;
      });
    }else{
      index = (roles === this.user.strRol) ? 1: -1; 
    }

    return (index !== -1) ? true:false;
  }


}
