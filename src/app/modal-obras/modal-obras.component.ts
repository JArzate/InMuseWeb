import { MuseoModelo } from 'src/modelos/museo-model';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { SalaService } from 'src/servicios/sala/sala.service';
import { ObraService } from 'src/servicios/obra/obra.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ObraModelo } from 'src/modelos/obra-model';
import { SalaModelo } from 'src/modelos/sala-model';

@Component({
  selector: 'app-modal-obras',
  templateUrl: './modal-obras.component.html',
  styleUrls: ['./modal-obras.component.scss']
})
export class ModalObrasComponent implements OnInit {

  arrObras:Array<ObraModelo>;
  arrObrasAux:Array<ObraModelo>;
  salas:Array<SalaModelo>;
  selectedObra:ObraModelo;
  filtroBuscar:string;
  loader:boolean;
  user:UsuarioModelo;
  museo:MuseoModelo;
  idSala:string;
  constructor(public dialogRef: MatDialogRef<ModalObrasComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public obraService:ObraService, public salaService:SalaService) {
    dialogRef.disableClose = true;
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
      this.dialogRef.close();
      this.selectedObra = null;
    }
  }

  selectObra = (obra:ObraModelo) => {
    if (this.selectedObra == obra){
      this.selectedObra = null;
      return;
    }

    this.selectedObra = obra;
  }

  elegirObra = () => {

    this.dialogRef.close(this.selectedObra);
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

    this.arrObras = this.arrObras.filter((obra: ObraModelo) => {
      return (obra.strIdSala == idSala);
    });
  }


   getObras = (idMuseo: string) => {
    this.obraService.getObrasMuseo(idMuseo).then((response: any) => {

      if (response.intStatus == 1) {
        this.arrObras = response.jsnAnswer;
        this.arrObrasAux = this.arrObras;
      }
      this.loader = false;
    }).then((error)=>{

    });
  }

  getSalas = (idMuseo) => {
    this.loader = true;
    this.salaService.getSalasMuseo(idMuseo).then((response: any) => {

      if (response.intStatus == 1) {
        this.salas = response.jsnAnswer;
      }
      this.loader = false;

    });
  }

}
