import { SalaService } from './../../servicios/sala/sala.service';
import { SalaModelo } from './../../modelos/sala-model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { MuseoModelo } from 'src/modelos/museo-model';


@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.scss']
})
export class ListaSalasComponent implements OnInit {
  museo:MuseoModelo;
  user:UsuarioModelo;
  arrSalas: Array<SalaModelo>;
  arrSalasAux: Array<SalaModelo>;
  filtroBuscar: string;
  loader: boolean;
  constructor(public router: Router, public salaService:SalaService) {
    this.loader = false;    
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getSalas(this.museo._id);
    }else{
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    } 
  }

  ngDoCheck() {
  }

  buscarSala = () => {

    if (!this.filtroBuscar) {
      this.arrSalas = this.arrSalasAux;
      return;
    }

    this.arrSalas = this.arrSalasAux.filter((sala) => {
      return sala.strNombre.toLowerCase().match(this.filtroBuscar.toLowerCase());
    });
  }


  eliminarSala = (sala: SalaModelo,i:number) => {
    
    Swal({
      title: sala.blnActivo ? '¿Deseas desactivar esta sala?' : '¿Deseas activar esta sala?',
      text: "Esta acción puede ser revertida",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: sala.blnActivo ? 'Sí, desactivar':'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;  
        delete sala.arrayStrImagen;       
        sala.blnActivo = !sala.blnActivo; 
        this.salaService.updateSala(sala).then((response: any) => {
          this.loader = false;
          if (response.intStatus == 1) {            
            Swal({
              title: "Acción realizada",
              text: sala.blnActivo ? "Sala desactivada correctamente" :  "Sala activada correctamente",
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

  irEditarSala = (sala: SalaModelo) => {
    this.router.navigate(['nueva-sala', { idSala: sala._id }]);
  }

  getSalas = (idMuseo)=>{
    this.loader = true;
    this.salaService.getSalasMuseo(idMuseo).then((response:any)=>{
      
      if (response.intStatus == 1){
        this.arrSalas = response.jsnAnswer;
        this.arrSalasAux = this.arrSalas;
      }
      this.loader = false;
    });
  }

  marcarDestacado = (sala:SalaModelo) => {
    this.loader = false;   
    delete sala.arrayStrImagen; 
    this.salaService.updateSala(sala).then((response: any) => {
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

}
