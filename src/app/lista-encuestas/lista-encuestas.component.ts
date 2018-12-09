import  Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MuseoModelo } from './../../modelos/museo-model';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { EncuestaService } from './../../servicios/encuesta/encuesta.service';
import { FeedBackModelo } from 'src/modelos/feedback-modelo';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-lista-encuestas',
  templateUrl: './lista-encuestas.component.html',
  styleUrls: ['./lista-encuestas.component.scss']
})
export class ListaEncuestasComponent implements OnInit {

  arrayFeedBack:Array<FeedBackModelo>;
  filtroFechaInicio:string;
  filtroFechaFin:string;
  user:UsuarioModelo; 
  museo:MuseoModelo;
  loader:boolean;

  constructor(public encuestaService:EncuestaService, public router:Router) { 
    this.loader = false;
    
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.filtrarEncuestas();
    } else {
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }    
  }

  filtrarEncuestas = () => {


    this.encuestaService.filtroEncuesta(this.museo._id,this.filtroFechaInicio,this.filtroFechaFin).then((response:any)=>{
      if (response.intStatus == 1){
        this.arrayFeedBack = response.jsnAnswer;
      }else{
        Swal({
          title:"¡Upss!",
          text:"No se encontraron encuestas para las fechas seleccionadas",
          type:"info",
          showConfirmButton:false,
          timer:1500
        });

        this.arrayFeedBack = [];
      }
    }).catch((error)=>{

    });
  }

}
