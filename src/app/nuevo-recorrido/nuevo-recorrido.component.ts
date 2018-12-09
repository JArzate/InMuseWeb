import { Router, ActivatedRoute } from '@angular/router';
import { MuseoModelo } from './../../modelos/museo-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PistaModelo } from './../../modelos/pista-model';
import { MatDialog } from '@angular/material';
import { ModalObrasComponent } from './../modal-obras/modal-obras.component';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ObraModelo } from 'src/modelos/obra-model';
import { RecorridoService } from 'src/servicios/recorrido/recorrido.service';
import { RecorridoModelo } from 'src/modelos/recorrido-modelo';
import { UsuarioModelo } from 'src/modelos/usuario-model';

@Component({
  selector: 'app-nuevo-recorrido',
  templateUrl: './nuevo-recorrido.component.html',
  styleUrls: ['./nuevo-recorrido.component.scss']
})
export class NuevoRecorridoComponent implements OnInit {
  form: FormGroup;
  loader: boolean;
  recorrido: RecorridoModelo;
  user: UsuarioModelo;
  museo: MuseoModelo;

  constructor(public router: Router, public _route: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder, public recorridoService: RecorridoService) {

  }


  ngOnInit() {
    this.loader = true;
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      pista: [null, Validators.required],
      puntos: [null, Validators.required],
    });
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    
    if (user_session) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));

      this._route.params.forEach((parametro) => {
        if (!parametro['idRecorrido']) {
          this.recorrido = new RecorridoModelo();
          this.recorrido.arrayModeloPista = [];
          this.recorrido.arrayModeloPista.push(new PistaModelo());
          this.loader =false;
        } else {
          this.getRecorrido(parametro['idRecorrido']);
        }
      });
    } else {
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }

  }

  agregar = () => {
    this.recorrido.arrayModeloPista.push(new PistaModelo());
    console.log(this.recorrido.arrayModeloPista); 
  }

  quitar = (i: number) => {
    Swal({
      title: '¿Deseas remover esta pista?',
      text: "Esta acción será permamente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#247897',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.recorrido.arrayModeloPista.splice(i, 1);
      }
    })

  }

  abrirModal = (pista?: PistaModelo) => {
    const dialogRef = this.dialog.open(ModalObrasComponent, {
      width: '75%',
      height: '80%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((obra: ObraModelo) => {
      pista.strImagen = obra.arrayStrImagen[0];
      pista.strIdObra = obra._id;
    });
  }


  submit = () => {
    !this.recorrido._id ? this.nuevoRecorrido() : this.updateRecorrido();
  }

  nuevoRecorrido = () => {
    this.getPistas();
    this.getPuntajes();
    console.log(this.recorrido);
    
    this.recorrido.strIdMuseo = this.museo._id;
    this.recorridoService.nuevaRecorrido(this.recorrido).then((response: any) => {
      if (response.intStatus == 1) {
        Swal({
          title: "¡Acción Realizada!",
          text: response.strAnswer,
          type: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          this.router.navigate(['/lista-recorridos']);
        });
      } else {
        Swal({
          title: "¡Upss!",
          text: response.strAnswer,
          type: "warning",
          timer: 1500,
          showConfirmButton: false
        }).then(()=>{
          window.location.reload();
        });;
      }
    }).catch(() => {

    });
  }

  updateRecorrido = () => {
    console.log("UPDATE");

    this.loader = true;

    this.recorridoService.updateRecorrido(this.recorrido).then((response: any) => {
      this.loader = false;
      if (response.intStatus == 1) {
        Swal({
          title: "Acción realizada",
          text: response.strAnswer,
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

  getRecorrido = (idRecorrido: string) => {
    this.recorridoService.getRecorrido(idRecorrido).then((response: any) => {
      if (response.intStatus == 1) {
        this.loader = false;
        this.recorrido = response.jsnAnswer;
      } else {
        this.loader = false;
        this.router.navigate(['lista-recorridos']);
      }
    }).catch((error) => {

    });
  }

  getPistas = () => {
    let datos: any = document.getElementsByName('pista');
    console.log(datos);
    for (let index = 0; index < datos.length; index++) {
      this.recorrido.arrayModeloPista[index].strPista = datos[index].value;
    }
  }

  getPuntajes = () => {
    let datos: any = document.getElementsByName('puntaje');
    console.log(datos);
    for (let index = 0; index < datos.length; index++) {
      this.recorrido.arrayModeloPista[index].intPuntos = +datos[index].value;
    }
  }




}
