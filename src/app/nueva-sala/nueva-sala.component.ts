import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SalaModelo } from './../../modelos/sala-model';
import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/servicios/sala/sala.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-sala',
  templateUrl: './nueva-sala.component.html',
  styleUrls: ['./nueva-sala.component.scss']
})
export class NuevaSalaComponent implements OnInit {
  arrayStrImagenesNuevas:Array<string>;
  arrayStrImagenesRemover:Array<string>;
  sala: SalaModelo;
  loader:boolean;
  user:UsuarioModelo;
  museo:MuseoModelo;
  form:FormGroup;

  constructor(public _route: ActivatedRoute, public salaService: SalaService,public _router:Router, public formBuilder:FormBuilder) {
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
        if (!parametro['idSala']){
          this.sala = new SalaModelo();
          this.loader = false;
        }else{
          this.getSala(parametro['idSala']);
        }
      });

    }else{
      sessionStorage.removeItem('usuario');
      this._router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion:['',Validators.required]
    });
  }


  agregar = () => {
    this.sala.arrayStrDatosCuriosos.push('');
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
        this.sala.arrayStrDatosCuriosos.splice(i, 1);
      }
    })

  }


  setPreview = (input) => {
    var files = input.files;

    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.sala._id){
            this.arrayStrImagenesNuevas.push(e.srcElement.result);
          } 
          this.sala.arrayStrImagen.push(e.srcElement.result);
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
          this.sala.strAudioDescripcion = e.srcElement.result;
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
      html: "<img src='" + this.sala.arrayStrImagen[i] + "' class='w-100'>"
    }).then((result) => {
      if (result.value) {
        if (this.sala._id){
          console.log("PUSH REMOVER");
          this.arrayStrImagenesRemover.push(this.sala.arrayStrImagen[i]);
        }
        this.sala.arrayStrImagen.splice(i, 1);
      }
    })
  }

  getDatosCuriosos = () => {
    let datos: any = document.getElementsByClassName('dato-curioso');

    for (let index = 0; index < datos.length; index++) {
      this.sala.arrayStrDatosCuriosos[index] = datos[index].value;
    }
  }

  nuevaSala = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.sala.strIdMuseo = this.museo._id;
    this.salaService.nuevaSala(this.sala).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          text: response.strAnswer,
          type: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          this._router.navigate(['/lista-salas']);
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

  updateSala = () => {
    this.loader = true;
    this.getDatosCuriosos();
    this.sala.arrayStrImagen = this.arrayStrImagenesRemover.concat(this.arrayStrImagenesNuevas);;

    this.salaService.updateSala(this.sala).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          text: response.strAnswer,
          type: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          this._router.navigate(['lista-salas']);
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

  getSala = (idSala: string) => {
    this.salaService.getSala(idSala).then((response: any) => {
      this.loader= false;

      if (response.intStatus == 1) {
        this.sala = response.jsnAnswer;
      }else{

      }
    });
  }

  submit = () =>{
    if (!this.sala._id){
      this.nuevaSala();
    }else{
      this.updateSala();
    }
  }

}
