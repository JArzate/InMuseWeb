import { SalaService } from './../../servicios/sala/sala.service';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { MuseoModelo } from './../../modelos/museo-model';
import { MuseoServiveService } from './../../servicios/museo/museo-servive.service';
import { Component, OnInit } from '@angular/core';
import { ObraModelo } from 'src/modelos/obra-model';
import Swal from 'sweetalert2';
import { SalaModelo } from 'src/modelos/sala-model';
import { Router } from '@angular/router';
import { ObraService } from 'src/servicios/obra/obra.service';


@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.scss']
})
export class ListaObrasComponent implements OnInit {
  arrObras: Array<ObraModelo>;
  arrObrasAux: Array<ObraModelo>;
  salas: Array<SalaModelo>;
  museo: MuseoModelo;
  user: UsuarioModelo;

  filtroBuscar: string;
  loader: boolean;
  idSala: string;
  constructor(public router: Router, public obraService: ObraService, public salaService: SalaService) {
    this.loader = false;
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getObras(this.museo._id);
      this.getSalas(this.museo._id);
    } else {
      sessionStorage.removeItem('usuario');
      this.router.navigate(['/']);
    }

  }

  buscarObra = () => {
    if (!this.filtroBuscar) {
      this.arrObras = this.arrObrasAux;
      return;
    }

    let sala: SalaModelo = this.salas.find((sala) => {
      return sala.strNombre.toLowerCase() == this.filtroBuscar.toLowerCase();
    });

    this.arrObras = this.arrObrasAux.filter((obra) => {
      return (obra.strTitulo.toLowerCase().match(this.filtroBuscar.toLowerCase())) || (sala && (obra.strIdSala == sala._id));
    });
  }

  filtroSalas = (idSala) => {
    if (idSala == 0) {
      this.arrObras = this.arrObrasAux;
      return;
    }
    this.arrObras = this.arrObrasAux.filter((obra: ObraModelo) => {
      return (obra.strIdSala == idSala);
    });
  }


  eliminarObra = (obra: ObraModelo, i: number) => {
    Swal({
      title: obra.blnActivo ? '¿Deseas desactivar esta obra?' : '¿Deseas activar esta obra?',
      text: "Esta acción puede ser revertida",      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText:  obra.blnActivo ? 'Sí, desactivar' : 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;
        obra.blnActivo = !obra.blnActivo;
        delete obra.arrayStrImagen;
        this.obraService.updateObra(obra).then((response: any) => {
          this.loader = false;
          if (response.intStatus == 1) {           
            Swal({
              title: "Acción realizada",
              text:  obra.blnActivo ? "Obra activada correctamente" : "Obra  desactivada correctamente",
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

  irEditarObra = (obra: ObraModelo) => {
    this.router.navigate(['nueva-obra', { idObra: obra._id }]);
  }

  getObras = (idMuseo: string) => {
    this.obraService.getObrasMuseo(idMuseo).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        this.arrObras = response.jsnAnswer;
        this.arrObrasAux = this.arrObras;
      }
    }).catch((error)=>{
      this.loader = false;
      this.router.navigate(['/']);
    });
  }

  getSalas = (idMuseo) => {
    this.loader = true;
    this.salaService.getSalasMuseo(idMuseo).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        this.salas = response.jsnAnswer;
      }

    }).catch((error)=>{
      this.loader = false;
      this.router.navigate(['/']);
    });
  }

  marcarDestacado = (obra:ObraModelo) => {
    this.loader = true; 
    delete obra.arrayStrImagen;   
    this.obraService.updateObra(obra).then((response: any) => {
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
    }).catch(()=>{
      this.loader = false;
      this.router.navigate(['/']);
    });
  }

}
