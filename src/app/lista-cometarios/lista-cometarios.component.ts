import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { MuseoModelo } from 'src/modelos/museo-model';
import { FeedbackService } from './../../servicios/feedback/feedback.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FeedBackModelo } from 'src/modelos/feedback-modelo';
import { SalaService } from 'src/servicios/sala/sala.service';
import { ObraService } from 'src/servicios/obra/obra.service';
import { SalaModelo } from 'src/modelos/sala-model';
import { ObraModelo } from 'src/modelos/obra-model';

@Component({
  selector: 'app-lista-cometarios',
  templateUrl: './lista-cometarios.component.html',
  styleUrls: ['./lista-cometarios.component.scss']
})
export class ListaCometariosComponent implements OnInit {
  arrFeedback:Array<FeedBackModelo>;
  filtroFechaInicio: any = 0;
  filtroFechaFin: any = 0;
  filtroTipo:string ="museo";
  coleccion:string = " ";
  salas:Array<SalaModelo>;
  obras:Array<ObraModelo>;
  museo:MuseoModelo;
  user:UsuarioModelo;
  loader:boolean;
  emocionElgida:string = " ";
  emociones:Array<string> = ["encantado","feliz","sorprendido","indiferente","triste","enojado"];

  constructor(public salaService:SalaService,public obraService:ObraService, public feedbackService:FeedbackService, public _router:ActivatedRoute, public _route:Router) {
    this.loader = true;
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getSalas(this.museo._id);
      this.getObras(this.museo._id);
      this.filtrarFeedback();
    }else{
      sessionStorage.removeItem('usuario');
      this._route.navigate['/'];
    }
  }
  
  filtrarFeedback = () => {  
    
    this.coleccion = this.filtroTipo == 'museo' ? " " : this.coleccion;
 
    //this.loader = true; 
    this.feedbackService.getFeedbackMuseo(this.museo._id,this.filtroTipo,this.coleccion,this.emocionElgida,this.filtroFechaInicio,this.filtroFechaFin).then((response:any)=>{
      if (response.intStatus == 1){
        this.arrFeedback = response.jsnAnswer;
      }else{
        this.arrFeedback = [];
        Swal({
          title:'¡Upss!',
          text:"No se encontraron resultados según los parametros dados",
          type:'info',
          showConfirmButton:false,
          timer:1500
        });

      }
      this.loader = false;
    }).catch((error)=>{

    });
  }

  eliminarComentario = (feedback:FeedBackModelo) => {
    Swal({
      title: '¿Deseas eliminar este comentario?',
      text: "Esta acción sera permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal({
          title:'Comentario eliminado correctamente!',
          type:'success',
          showConfirmButton:false,
          timer:1500
        })
      }
    })
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

  getObras = (idMuseo: string) => {
    this.obraService.getObrasMuseo(idMuseo).then((response: any) => {

      if (response.intStatus == 1) {
        this.obras = response.jsnAnswer;
      }
      this.loader = false;
    }).then((error)=>{

    });
  }

}
