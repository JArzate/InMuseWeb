import { UsuarioModelo } from 'src/modelos/usuario-model';
import { Router, ActivatedRoute } from '@angular/router';
import { MuseoModelo } from './../../modelos/museo-model';
import { PreguntaService } from './../../servicios/pregunta/pregunta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { PreguntaModelo } from 'src/modelos/pregunta-model';

@Component({
  selector: 'app-nueva-encuesta',
  templateUrl: './nueva-encuesta.component.html',
  styleUrls: ['./nueva-encuesta.component.scss']
})
export class NuevaEncuestaComponent implements OnInit {
  arrPreguntas:Array<PreguntaModelo>;
  form:FormGroup;
  opcion:string;
  museo:MuseoModelo;
  user:UsuarioModelo;
  loader:boolean;

  constructor(public preguntasService:PreguntaService,public formBuilder:FormBuilder,public _router:ActivatedRoute,public _route:Router) {   
    this.loader = true;    
   }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  

      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));   
      this.getPreguntas(this.museo._id);

    }else{
      this._route.navigate['/'];
      sessionStorage.removeItem('usuario');
    }

    this.form = this.formBuilder.group({
      pregunta: ['', Validators.required],
    });
  }

  agregar = () => {
    this.arrPreguntas.push(new PreguntaModelo());
  }

  quitar = (i:number) => {
    Swal({
      title: '¿Deseas remover esta pregunta?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.arrPreguntas.splice(i,1);
      }
    })

  }

  agregarOpcion = (pregunta:PreguntaModelo) => {
    pregunta.arrayStrOpciones.push(this.opcion);
    this.opcion = "";
  }

  removerOpcion = (i:number,pregunta:PreguntaModelo) => {
    Swal({
      title: '¿Deseas remover esta opción?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        pregunta.arrayStrOpciones.splice(i,1);
      }
    })

  }

  clearOpciones = (pregunta:PreguntaModelo) => {
    if (pregunta.strTipo == "abierta" && pregunta.arrayStrOpciones.length > 0){
      Swal({
        title: '¿Deseas modificar el tipo de respuesta?',
        text: "Al parecer ya hay opciones, estas serán eliminadas",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#247897',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, modificar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.value) {
          pregunta.arrayStrOpciones = [];
        }else{
          pregunta.strTipo = 'opcional';
        }
      })
    }
   
  }

  submit = () => {
    this.loader  = true;
    this.preguntasService.guardarPreguntas(this.arrPreguntas,this.museo._id).then((response:any)=>{
      if (response.intStatus == 1){
        Swal({
          title:"Acción realizada",
          text:"Los cambios han sido guardados correctamente",
          type:"success"
        });
      }
      this.loader = false;
    }).catch((error)=>{

    });
  }

  getPreguntas = (idMuseo:string) => {
    this.loader = true;
    this.preguntasService.getPreguntasMuseo(idMuseo).then((response:any)=>{
      if (response.intStatus == 1){
        this.arrPreguntas = response.jsnAnswer;
      }else{
        this.arrPreguntas = new Array();
        this.arrPreguntas.push(new PreguntaModelo());

      }
      this.loader = false;
    }).catch((error)=>{

    });
  }

}
