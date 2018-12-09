import { EventoService } from 'src/servicios/evento/evento.service';
import  Swal  from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MuseoModelo } from './../../modelos/museo-model';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { Component, OnInit } from '@angular/core';
import { EventoModelo } from 'src/modelos/evento-modelo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.scss']
})
export class NuevoEventoComponent implements OnInit {
  arrayStrImagenesNuevas:Array<string>;
  arrayStrImagenesRemover:Array<string>;
  user:UsuarioModelo;
  museo:MuseoModelo;
  evento:EventoModelo;
  form:FormGroup;
  loader:boolean;

  constructor(public router:Router,public _route:ActivatedRoute,public formBuilder:FormBuilder,public eventoService:EventoService) { 
    this.loader = false;
    this.arrayStrImagenesNuevas = [];
    this.arrayStrImagenesRemover = [];
  }

  ngOnInit() {
    this.loader = true;
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  

      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this._route.params.forEach((parametro)=>{
        if (!parametro['idEvento']){
          this.evento = new EventoModelo();
          this.loader =false;
        }else{
          this.getEvento(parametro['idEvento']);
        }
      });

    }else{
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }

    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      descripcion:[null,Validators.required],
      fecha:[null,Validators.required]
    });
  }

  submit = () =>{
    if (this.evento._id){
      this.updateEvento();
    }else{
      this.nuevoEvento();
    }
  }

  setPreview = (input) => {
    var files = input.files;

    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.evento._id){
            this.arrayStrImagenesNuevas.push(e.srcElement.result);
          } 
          this.evento.arrayStrImagen.push(e.srcElement.result);
        }
        reader.readAsDataURL(input.files[index]);
      }
    }
  }

  removerImagen = (i, input) => {
    Swal({
      title: '¿Deseas remover esta imagen?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      html: "<img src='" + this.evento.arrayStrImagen[i] + "' class='w-100'>"
    }).then((result) => {
      if (result.value) {
        if (this.evento._id){
          console.log("PUSH REMOVER");
          this.arrayStrImagenesRemover.push(this.evento.arrayStrImagen[i]);
        }
        this.evento.arrayStrImagen.splice(i, 1);
      }
    })
  }

  getEvento = (idEvento:string) => {
    this.eventoService.getEvento(idEvento).then((response: any) => {
      this.loader= false;
      if (response.intStatus == 1) {
        this.evento = response.jsnAnswer;
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  nuevoEvento = () =>  {
    this.loader = true;
    this.evento.strIdMuseo = this.museo._id;
    this.eventoService.nuevoEvento(this.evento).then((response:any)=>{
      this.loader = false;
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text: response.strAnswer,
          type:"success",
        }).then(()=>{
          this.router.navigate(['/lista-eventos']);
        });
      }else{
        Swal({
          title:"¡Upss!",
          text: response.strAnswer,
          type:"warning",
        });
      }
    });
  }

  updateEvento = () => {
     this.loader = true; 
     this.evento.arrayStrImagen = this.arrayStrImagenesRemover.concat(this.arrayStrImagenesNuevas);     
     this.eventoService.updateEvento(this.evento).then((response:any)=>{
       this.loader = false;
       if (response.intStatus == 1){
         Swal({
           title:"Acción realizada",
           text: response.strAnswer,
           type:"success",
           timer: 1500,
           showConfirmButton:false
         }).then(()=>{
          this.router.navigate(['/lista-eventos']);
        });
       }else{
         Swal({
           title:"¡Upss!",
           text: response.strAnswer,
           type:"warning",
           timer: 1500,
           showConfirmButton:false
         }).then(()=>{
          this.router.navigate(['/lista-eventos']);
        });
       }
     });
   }

}
