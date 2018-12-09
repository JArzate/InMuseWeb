import { UsuarioModelo } from 'src/modelos/usuario-model';
import { MuseoServiveService } from './../../servicios/museo/museo-servive.service';
import { Router } from '@angular/router';
import { MotivoModelo } from './../../modelos/motivo-modelo';
import { MuseoModelo } from './../../modelos/museo-model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-museos',
  templateUrl: './lista-museos.component.html',
  styleUrls: ['./lista-museos.component.scss']
})
export class ListaMuseosComponent implements OnInit {
  loader:boolean;
  filtroBuscar:string;
  arrMuseos:Array<MuseoModelo>;
  arrMuseosAux:Array<MuseoModelo>;
  user:UsuarioModelo;
  constructor(public router: Router, public  museoService:MuseoServiveService) {
    
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session && user_session.strRol == "superadmin"){  
      this.user = user_session;
      this.getMuseos();
    }else{
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }
  }

  buscarMuseo = () =>{
    if (!this.filtroBuscar) {
      this.arrMuseos = this.arrMuseosAux;
      return;
    }

    this.arrMuseos = this.arrMuseosAux.filter((museo) => {
      return museo.strNombre.toLowerCase().match(this.filtroBuscar.toLowerCase());
    });
  }

  irEditarMuseo = (museo:MuseoModelo) => {
    this.router.navigate(['perfil-museo', { idMuseo: museo._id }]);
  }

  eliminarMuseo = (museo: MuseoModelo,i:number) => {
    
    Swal({
      title: '¿Deseas desactivar esta museo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loader = true;  
        delete museo.arrayStrImagen;       
        museo.blnActivo = false; 
        this.museoService.updateMuseo(museo).then((response: any) => {
          this.loader = false;
          if (response.intStatus == 1) {
            this.arrMuseos.splice(i,1);
            Swal({
              title: "Acción realizada",
              text: "Museo desctivado correctamente",
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

  getMuseos = () =>{
    this.loader = true;
    this.museoService.getMuseos(this.user._id).then((response:any)=>{
      
      if (response.intStatus == 1){
        this.arrMuseos = response.jsnAnswer;
        this.arrMuseos = this.arrMuseos.filter((museo:MuseoModelo)=>{
          return museo.blnActivo;
        });
        this.arrMuseosAux = this.arrMuseos;
      }
      this.loader = false;
    });
  }

}
