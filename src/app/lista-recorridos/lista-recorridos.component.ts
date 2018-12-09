import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { MuseoModelo } from 'src/modelos/museo-model';
import { RecorridoModelo } from './../../modelos/recorrido-modelo';
import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { RecorridoService } from 'src/servicios/recorrido/recorrido.service';

@Component({
  selector: 'app-lista-recorridos',
  templateUrl: './lista-recorridos.component.html',
  styleUrls: ['./lista-recorridos.component.scss']
})
export class ListaRecorridosComponent implements OnInit {

  loader:boolean;
  filtroBuscar:string;
  arrRecorridos:Array<RecorridoModelo>;
  arrRecorridosAux:Array<RecorridoModelo>;
  user:UsuarioModelo;
  museo:MuseoModelo;
  constructor(public router: Router, public  recorridoServide:RecorridoService) {
    
  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session){  
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getRecorridos();
    }else{
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }
  }

  buscarRecorrido = () =>{
    if (!this.filtroBuscar) {
      this.arrRecorridos = this.arrRecorridosAux;
      return;
    }

    this.arrRecorridos = this.arrRecorridosAux.filter((museo) => {
      return museo.strNombre.toLowerCase().match(this.filtroBuscar.toLowerCase());
    });
  }

  irEditarRecorrido = (recorrido:RecorridoModelo) => {    
    this.router.navigate(['nuevo-recorrido', { idRecorrido: recorrido._id }]);
  }

  // eliminarMuseo = (recorrido: RecorridoModelo,i:number) => {
    
  //   Swal({
  //     title: '¿Deseas desactivar esta museo?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#247897',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, desactivar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.loader = true;  
  //       delete museo.arrayStrImagen;       
  //       recorrido.blnActivo = false; 
  //       this.recorridoServide.updateRecorrido(recorrido).then((response: any) => {
  //         this.loader = false;
  //         if (response.intStatus == 1) {
  //           this.arrMuseos.splice(i,1);
  //           Swal({
  //             title: "Acción realizada",
  //             text: "Museo desctivado correctamente",
  //             type: "success",
  //             timer: 1500,
  //             showConfirmButton: false
  //           });
  //         } else {
  //           Swal({
  //             title: "¡Upss!",
  //             text: response.strAnswer,
  //             type: "warning",
  //             timer: 1500,
  //             showConfirmButton: false
  //           });
  //         }

  //       });
  //     }
  //   })
  // }

  getRecorridos = () =>{
    this.loader = true;
    this.recorridoServide.getRecorridosMuseo(this.museo._id).then((response:any)=>{
      
      if (response.intStatus == 1){
        this.arrRecorridos = response.jsnAnswer;
        this.arrRecorridosAux = this.arrRecorridos;
        this.loader = false;
      }
    });
  }

}
