import { FormBuilder, FormGroup } from '@angular/forms';
import Swal  from 'sweetalert2';
import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { Component, OnInit } from '@angular/core';
import { EventoModelo } from 'src/modelos/evento-modelo';
import { Router } from '@angular/router';
import { EventoService } from 'src/servicios/evento/evento.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {

  arraEventos:Array<EventoModelo>;
  arraEventosAux:Array<EventoModelo>;
  filtroBuscar:string;
  user:UsuarioModelo;
  museo:MuseoModelo;
  loader:boolean;

  constructor(public router:Router,public eventoService:EventoService) { 
  }

  ngOnInit() {
    this.loader = true;

    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session && user_session.blnPremium) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getEventos(this.museo._id);
    } else {
      this.router.navigate(['/']);
    }
  }

  buscarEvento = () => {
    if (!this.filtroBuscar) {
      this.arraEventos = this.arraEventosAux;
      return;
    }

    this.arraEventos = this.arraEventosAux.filter((evento:EventoModelo) => {
      return (evento.strNombre.toLowerCase().match(this.filtroBuscar.toLowerCase()));
    });
  }

  eliminarEvento = (evento: EventoModelo, i: number) => {
    Swal({
      title: evento.blnActivo ? '¿Deseas desactivar este evento?' : '¿Deseas activar este evento?',
      text: "Esta acción puede ser revertida",      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText:  evento.blnActivo ? 'Sí, desactivar' : 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;
        evento.blnActivo = !evento.blnActivo;
        delete evento.arrayStrImagen;
        this.eventoService.updateEvento(evento).then((response: any) => {
          this.loader = false;
          if (response.intStatus == 1) {           
            Swal({
              title: "Acción realizada",
              text:  evento.blnActivo ? "Evento activado correctamente" : "Evento desactivado correctamente",
              type: "success",
              timer: 1500,
              showConfirmButton: false
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
    })
  }


  irEditarEvento = (evento: EventoModelo) => {
    this.router.navigate(['nuevo-evento', { idEvento: evento._id }]);
  }

  marcarDestacado = (evento:EventoModelo) => {
    this.loader = false; 
    delete evento.arrayStrImagen;   
    this.eventoService.updateEvento(evento).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          type: "success",
          timer: 1500,
          showConfirmButton: false
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

  getEventos = (idMuseo:string) =>{
    this.eventoService.getEventosMuseo(idMuseo).then((response:any)=>{
      
      if (response.intStatus == 1){
        this.arraEventos = response.jsnAnswer;
        this.arraEventosAux = this.arraEventos;
      }
      this.loader = false;
    });
  }

}
