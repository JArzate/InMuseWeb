import { ArtistaService } from './../../servicios/artista/artista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistaModelo } from './../../modelos/artista-model';
import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { MuseoModelo } from 'src/modelos/museo-model';


@Component({
  selector: 'app-nuevo-artista',
  templateUrl: './nuevo-artista.component.html',
  styleUrls: ['./nuevo-artista.component.scss']
})
export class NuevoArtistaComponent implements OnInit {

  arrayStrImagenesNuevas:Array<string>;
  arrayStrImagenesRemover:Array<string>;
  artista: ArtistaModelo;
  loader:boolean;
  user:UsuarioModelo;
  museo:MuseoModelo;
  form:FormGroup;

  constructor(public _route: ActivatedRoute, public artistaService: ArtistaService,public _router:Router, public formBuilder:FormBuilder) {
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
        if (!parametro['idArtista']){
          this.artista = new ArtistaModelo();
          this.loader = false;
        }else{
          this.getArtista(parametro['idArtista']);
        }
      });

    }else{
      sessionStorage.removeItem('usuario');
      this._router.navigate['/'];
    }

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
  }

  agregar = () => {
    this.artista.arrayStrDatosCuriosos.push('');
  }

  quitar = (i: number) => {
    Swal({
      title: '¿Deseas remover este dato?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.artista.arrayStrDatosCuriosos.splice(i, 1);
      }
    })

  }


  setPreview = (input) => {
    var files = input.files;

    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.artista._id){
            this.arrayStrImagenesNuevas.push(e.srcElement.result);
          } 
          this.artista.arrayStrImagen.push(e.srcElement.result);
        }
        reader.readAsDataURL(input.files[index]);
      }
    }
  }

  setAudioPreview = (input) => {
    var files = input.files;

    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.artista.strAudioDescripcion = e.srcElement.result;
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
      html: "<img src='" + this.artista.arrayStrImagen[i] + "' class='w-100'>"
    }).then((result) => {
      if (result.value) {
        if (this.artista._id){
          console.log("PUSH REMOVER");
          this.arrayStrImagenesRemover.push(this.artista.arrayStrImagen[i]);
        }
        this.artista.arrayStrImagen.splice(i, 1);
      }
    })
  }

  getDatosCuriosos = () => {
    let datos: any = document.getElementsByClassName('dato-curioso');

    for (let index = 0; index < datos.length; index++) {
      this.artista.arrayStrDatosCuriosos[index] = datos[index].value;
    }
  }

  nuevoArtista = () => {
    this.getDatosCuriosos();
    this.artista.strIdMuseo = this.museo._id;
    this.artistaService.nuevoArtista(this.artista).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          text: response.strAnswer,
          type: "success",
        }).then(()=>{
          this._router.navigate(['lista-artistas']);
        });
      } else {
        Swal({
          title: "¡Upss!",
          text: response.strAnswer,
          type: "warning",
          timer: 1500,
          showConfirmButton: false
        });
      }

    });
  }

  updateArtista = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.artista.arrayStrImagen = this.arrayStrImagenesRemover.concat(this.arrayStrImagenesNuevas);;
    console.log(this.artista);
    this.artistaService.updateArtista(this.artista).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          text: response.strAnswer,
          type: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          this._router.navigate(['lista-artistas']);
        });
      } else {
        Swal({
          title: "¡Upss!",
          text: response.strAnswer,
          type: "warning",
          timer: 1500,
          showConfirmButton: false
        });
      }

    });
  }

  getArtista = (idSala: string) => {
    this.loader = true;
    this.artistaService.getArtista(idSala).then((response: any) => {
      this.loader= false;

      if (response.intStatus == 1) {
        this.artista = response.jsnAnswer;
      }else{

      }
    });
  }

  submit = () =>{
    if (!this.artista._id){
      this.nuevoArtista();
    }else{
      this.updateArtista();
    }
  }

}
