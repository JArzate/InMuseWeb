import { DatePipe } from '@angular/common';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { MuseoServiveService } from './../../servicios/museo/museo-servive.service';
import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { MuseoModelo } from 'src/modelos/museo-model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-perfil-museo',
  templateUrl: './perfil-museo.component.html',
  styleUrls: ['./perfil-museo.component.scss']
})
export class PerfilMuseoComponent implements OnInit {
  arrayStrImagenesNuevas:Array<string>;
  arrayStrImagenesRemover:Array<string>;
  museo:MuseoModelo;
  user:UsuarioModelo;
  loader:boolean;
  form: FormGroup;

  constructor( public datePipe: DatePipe,public museoService:MuseoServiveService,public _router:Router,public _route:ActivatedRoute, public formBuilder:FormBuilder) {
    this.loader = false;
    this.arrayStrImagenesNuevas = [];
    this.arrayStrImagenesRemover = [];
    
  }

  ngOnInit() {
    let user_session:UsuarioModelo = JSON.parse(sessionStorage.getItem('usuario'));
    
    if (user_session && user_session.strRol == "admin"){
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getMuseo(this.museo._id);
    }else if (user_session && user_session.strRol == "superadmin"){
      this.user = user_session;
      
      this._route.params.forEach((parametro)=>{
        if (!parametro['idMuseo']){
          this.museo = new MuseoModelo();
        }else{
          this.getMuseo(parametro['idMuseo']);
        }
      });
    }else{
      sessionStorage.removeItem('usuario');
      this._router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      fundador: ['', Validators.required],
      descripcion:['',Validators.required]
    });
  }

  ngDoCheck(): void {
  }

  setPreview = (input) =>{
    var files = input.files;

    if(files.length > 0){
      for (let index = 0; index < files.length; index++) {      
        var reader = new FileReader();
        reader.onload = (e:any) => {
          if (this.museo._id){
            this.arrayStrImagenesNuevas.push(e.srcElement.result);
          } 
          this.museo.arrayStrImagen.push(e.srcElement.result);
        }
        reader.readAsDataURL(input.files[index]);        
      }
    }
  }

  setAudioPreview =(input)=>{
    var files = input.files;

    if(files.length > 0){
      for (let index = 0; index < files.length; index++) {      
        var reader = new FileReader();
        reader.onload = (e:any) => {
          this.museo.strAudioDescripcion = e.srcElement.result;
        }
        reader.readAsDataURL(input.files[index]);        
      }
    }
  }
    

  removerImagen = (i,input) => {
    Swal({
      title: '¿Deseas remover esta imagen?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar',
      html:"<img src='"+ this.museo.arrayStrImagen[i]+"' class='w-100'>"
    }).then((result) => {
      if (result.value) {
        if (this.museo._id){
          console.log("PUSH REMOVER");
          this.arrayStrImagenesRemover.push(this.museo.arrayStrImagen[i]);
        }
        this.museo.arrayStrImagen.splice(i,1);    
      }
    })
  }

  agregar = () => {
    this.museo.arrayStrDatosCuriosos.push('');
  }

  quitar = (i:number) => {
    Swal({
      title: '¿Deseas remover este dato?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.museo.arrayStrDatosCuriosos.splice(i,1);
      }
    })

  }

  agregarFundador = () => {
    this.museo.arrayStrNombreFundador.push('');
  }

  quitarFundador = (i:number) => {
    Swal({
      title: '¿Deseas remover fundador?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.museo.arrayStrNombreFundador.splice(i,1);
      }
    })

  }

  getDatosCuriosos = () => {
    let datos:any = document.getElementsByClassName('dato-curioso');

    for (let index = 0; index < datos.length; index++) {
      this.museo.arrayStrDatosCuriosos[index]  = datos[index].value; 
    }
  }

  getFundadores = () => {
    let fundadores:any = document.getElementsByClassName('fundador');

    for (let index = 0; index < fundadores.length; index++) {
      this.museo.arrayStrNombreFundador[index]  = fundadores[index].value; 
    }
  }

  getMuseo = (idMuseo:string) =>{

      this.museoService.getMuseo(idMuseo).then((response:any)=>{
        if (response.intStatus === 1){
            this.museo = response.jsnAnswer;          
            sessionStorage.setItem('museo',JSON.stringify(this.museo));                   
        }else{
          Swal({
            title:"¡Upss!",
            text:response.strAnswer,
            type:"warning"
          });
        }
      });
  }

  nuevoMuseo = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.getFundadores();
   
    this.museoService.nuevoMuseo(this.museo).then((response:any)=>{
      this.loader = false;
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text: response.strAnswer,
          type:"success",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          window.location.reload();
        });
      }else{
        Swal({
          title:"¡Upss!",
          text: response.strAnswer,
          type:"warning",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          window.location.reload();
        });
      }
      
    }).catch((error:any)=>{
      this.loader = false;
      Swal({
        title:"¡Upss!",
        text: error.strAnswer,
        type:"warning",
        timer: 1500,
        showConfirmButton:false
      });
    });
  }

  updateMuseo = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.getFundadores();
    this.museo.arrayStrImagen = this.arrayStrImagenesRemover.concat(this.arrayStrImagenesNuevas); 

    this.museoService.updateMuseo(this.museo).then((response:any)=>{
      this.loader = false;
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text: response.strAnswer,
          type:"success",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          window.location.reload();
        });
      }else{
        Swal({
          title:"¡Upss!",
          text: response.strAnswer,
          type:"warning",
          timer: 1500,
          showConfirmButton:false
        });
      }
      
    });
  }

  submit = () =>{    
    if (this.museo._id){
      this.updateMuseo();
    }else{
      if (this.user.strRol == 'superadmin'){
        this.nuevoMuseo();
      }else{
        this._router.navigate(['/']);
        sessionStorage.removeItem('usuario');
      }
    }
  }

}
