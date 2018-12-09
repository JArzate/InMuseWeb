import Swal from 'sweetalert2';
import { ArtistaModelo } from './../../modelos/artista-model';
import { Component, OnInit } from '@angular/core';
import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { Router } from '@angular/router';
import { ArtistaService } from 'src/servicios/artista/artista.service';

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.scss']
})
export class ListaArtistasComponent implements OnInit {

  arrArtistas: Array<ArtistaModelo>;
  arrArtistasAux: Array<ArtistaModelo>;
  museo: MuseoModelo;
  user: UsuarioModelo;

  filtroBuscar: string;
  loader: boolean;
  idSala: string;
  constructor(public router: Router, public artistaService: ArtistaService) {
    this.loader = false;
  }

  ngOnInit() {

    this.loader = false;
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getArtistas(this.museo._id);
    } else {
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
  }

  buscarArtista = () => {
    if (!this.filtroBuscar) {
      this.arrArtistas = this.arrArtistasAux;
      return;
    }

    this.arrArtistas = this.arrArtistasAux.filter((artista: ArtistaModelo) => {
      return (artista.strNombre.toLowerCase().match(this.filtroBuscar.toLowerCase()));
    });
  }


  eliminarArtista = (artista: ArtistaModelo, i: number) => {
    Swal({
      title: artista.blnActivo ? '¿Deseas desactivar este artista?' : '¿Deseas activar este artista?',
      text: "Esta acción puede ser revertida",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: artista.blnActivo ? 'Sí, desactivar' : 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;
        artista.blnActivo = !artista.blnActivo;
        delete artista.arrayStrImagen;
        this.artistaService.updateArtista(artista).then((response: any) => {
          this.loader = false;
          if (response.intStatus == 1) {
            Swal({
              title: "Acción realizada",
              text: artista.blnActivo ? "Obra activada correctamente" : "Obra  desactivada correctamente",
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

  irEditarArtista = (artista: ArtistaModelo) => {
    this.router.navigate(['nuevo-artista', { idArtista: artista._id }]);
  }

  getArtistas = (idMuseo: string) => {
    this.artistaService.getArtistasMuseo(idMuseo).then((response: any) => {

      if (response.intStatus == 1) {
        this.arrArtistas = response.jsnAnswer;
        this.arrArtistasAux = this.arrArtistas;
      }
      this.loader = false;
    }).then((error) => {
      this.loader = false;

    });
  }

  marcarDestacado = (artista: ArtistaModelo) => {
    this.loader = false;
    delete artista.arrayStrImagen;
    this.artistaService.updateArtista(artista).then((response: any) => {
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
