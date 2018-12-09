import { ArtistaModelo } from './../../modelos/artista-model';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { SalaService } from './../../servicios/sala/sala.service';
import { SalaModelo } from './../../modelos/sala-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ObraModelo } from 'src/modelos/obra-model';
import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { ObraService } from 'src/servicios/obra/obra.service';
import { ArtistaService } from 'src/servicios/artista/artista.service';


@Component({
  selector: 'app-nueva-obra',
  templateUrl: './nueva-obra.component.html',
  styleUrls: ['./nueva-obra.component.scss']
})
export class NuevaObraComponent implements OnInit {
  arrayStrImagenesNuevas:Array<string>;
  arrayStrImagenesRemover:Array<string>;
  obra:ObraModelo;
  salas:Array<SalaModelo>;
  artistas:Array<ArtistaModelo>;
  loader:boolean;
  user:UsuarioModelo;
  museo:MuseoModelo;
  form:FormGroup;
  QRString:string;

  constructor(public _route: Router,public _router:ActivatedRoute, public obraService:ObraService, public salaService:SalaService,public formBuilder:FormBuilder, public artistaService:ArtistaService) { 
    this.arrayStrImagenesNuevas = [];
    this.arrayStrImagenesRemover = [];
  }

  ngOnInit() {
    this.loader = true;

    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  

      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getSalas(this.museo._id);
      this.getArtistas(this.museo._id);
      this._router.params.forEach((parametro)=>{
        if (!parametro['idObra']){
          this.obra = new ObraModelo();
          this.loader = false;
        }else{
          this.getObra(parametro['idObra']);
        }
      });

    }else{
      sessionStorage.removeItem('usuario');
      this._route.navigate['/'];
    }

    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      fecha: [null, Validators.required],
      artista: [null, Validators.required],
      sala: [null, Validators.required],
      descripcion:[null,Validators.required]
    });
  }

  agregar = () => {
    this.obra.arrayStrDatosCuriosos.push('');
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
        this.obra.arrayStrDatosCuriosos.splice(i,1);
      }
    })

  }

  agregarArtista = () => {
    this.obra.arrayStrIdArtista.push('');
  }

  quitarArtista = (i:number) => {
    Swal({
      title: '¿Deseas remover este artista?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.obra.arrayStrIdArtista.splice(i,1);
      }
    })

  }

  findArtista = (select:any,i:number) => {
    
    let index = this.obra.arrayStrIdArtista.findIndex((idArtistaArr:string)=>{
      return select.value == idArtistaArr;
    });

    if (index != -1) {
      if (this.obra.arrayStrIdArtista[i] == select.value){
        this.obra.arrayStrIdArtista[i] = select.value;
      }else{
        Swal({
          title:"¡Upps!",
          text: "Al parecer este artista ya fue seleccionado anteriormente",
          type:"error",
        }).then(()=>{
          select.value = "";
        });
      }
    }else{
      this.obra.arrayStrIdArtista[i] = select.value;
    }
  }

  setAudioPreview =(input)=>{
    var files = input.files;

    if(files.length > 0){
      for (let index = 0; index < files.length; index++) {      
        var reader = new FileReader();
        reader.onload = (e:any) => {
          this.obra.strAudioDescripcion = e.srcElement.result;          
        }
        reader.readAsDataURL(input.files[index]);        
      }
    }
  }

  setPreview = (input) =>{
    var files = input.files;

    if(files.length > 0){
      for (let index = 0; index < files.length; index++) {      
        var reader = new FileReader();
        reader.onload = (e:any) => {
          this.obra.arrayStrImagen.push(e.srcElement.result); 
          if (this.obra._id){
            this.arrayStrImagenesNuevas.push(e.srcElement.result);
          }         
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
      html:"<img src='"+ this.obra.arrayStrImagen[i]+"' class='w-100'>"
    }).then((result) => {
      if (result.value) {
        if (this.obra._id){
          console.log("PUSH REMOVER");
          this.arrayStrImagenesRemover.push(this.obra.arrayStrImagen[i]);
        }
        this.obra.arrayStrImagen.splice(i,1);    
      }
    })
  }

  
  getDatosCuriosos = () => {
    let datos:any = document.getElementsByClassName('dato-curioso');

    for (let index = 0; index < datos.length; index++) {
      this.obra.arrayStrDatosCuriosos[index]  = datos[index].value; 
    }
  }

  nuevaObra = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.obra.strIdMuseo = this.museo._id;

    this.obraService.nuevaObra(this.obra).then((response:any)=>{
      this.loader = false;
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text: response.strAnswer,
          type:"success",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          this._route.navigate(['/lista-obras']);
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
        });;
      }
    });
  }

  updateObra = () => { 
    this.loader = true;
    this.getDatosCuriosos();

    this.obra.arrayStrImagen = this.arrayStrImagenesRemover.concat(this.arrayStrImagenesNuevas);  

    this.obraService.updateObra(this.obra).then((response:any)=>{
      this.loader = false;
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text: response.strAnswer,
          type:"success",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          this._route.navigate(['/lista-obras']);
        });;
      }else{
        Swal({
          title:"¡Upss!",
          text: response.strAnswer,
          type:"warning",
          timer: 1500,
          showConfirmButton:false
        }).then(()=>{
          window.location.reload();
        });;
      }
    });
  }

  getSalas = (idMuseo)=>{
    this.loader = true;
    this.salaService.getSalasMuseo(idMuseo).then((response:any)=>{      
      if (response.intStatus == 1){
        this.salas = response.jsnAnswer;        
      }
      this.loader = false;
    });
  }

  getObra = (idObra: string) => {
      this.obraService.getObra(idObra).then((response: any) => {
        this.loader = false;
        if (response.intStatus == 1) {
          this.obra = response.jsnAnswer;
          this.QRString = JSON.stringify({strIdMuseo: this.obra.strIdMuseo,strIdObra:this.obra._id});
        }else{
          Swal({
            title:"Error",
            text:response.strAnswer,
            type:"error"
          });
        }
      });
  }

  getArtistas = (idMuseo)=>{
    this.loader = true;
    this.artistaService.getArtistasMuseo(idMuseo).then((response:any)=>{      
      if (response.intStatus == 1){
        this.artistas = response.jsnAnswer;   
        console.log(this.artistas,"artistas");
             
      }
      this.loader = false;
    });
    
  }

  submit = () => {
    if (!this.obra._id){
      this.nuevaObra();
    }else{
      this.updateObra();
    }
  }

}
