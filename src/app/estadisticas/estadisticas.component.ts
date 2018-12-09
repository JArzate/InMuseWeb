import { GraficaModelo } from './../../modelos/grafica-model';
import Swal from 'sweetalert2';
import { EstadisticaService } from './../../servicios/estadistica/estadistica.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/modelos/usuario-model';
import { MuseoModelo } from 'src/modelos/museo-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  strTipo: string = 'ano';
  filtroFechaInicio: any;
  filtroFechaFin: any;
  museo: MuseoModelo;
  user: UsuarioModelo;
  loader: boolean;
  formato: string;
  arrayCharts: Array<GraficaModelo>;

  ChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  constructor(public router: Router, public estadisticasService: EstadisticaService, public datePipe: DatePipe) {

  }

  ngOnInit() {
    let user_session = JSON.parse(sessionStorage.getItem('usuario'));
    if (user_session) {
      this.user = user_session;
      this.museo = JSON.parse(sessionStorage.getItem('museo'));
      this.getEstaditicas();
    } else {
      sessionStorage.removeItem('usuario');
      this.router.navigate['/'];
    }
  }

  getEstaditicas = () => {
    let blnAno: boolean = false;
    let blnMes: boolean = false;

    switch (this.strTipo) {
      case 'ano':
        this.filtroFechaFin = 0;
        this.filtroFechaInicio = 0;
        blnAno = true;
        break;
      case 'mes':
        this.filtroFechaFin = 0;
        this.filtroFechaInicio = 0;
        blnMes = true;
        break;
      case 'rango':
        if (this.filtroFechaFin == 0 || this.filtroFechaInicio == 0) {
          return;
        }
        break;
    }
    this.loader = true;

    this.estadisticasService.getEstadisticas(this.museo._id, blnAno, blnMes, this.filtroFechaInicio, this.filtroFechaFin).then((response: any) => {
      if (response.intStatus == 1) {
        this.loader = false;
        this.arrayCharts = new Array();
        this.changePipe();
        response.jsnAnswer.forEach((chartGET: GraficaModelo, index: any) => {
          var chart = new GraficaModelo(chartGET);
          chart.strTipo = chart.arrayTipo[0];
          chart.arrayX = [];
          chartGET.arrayX.forEach((label) => {
            chart.arrayX.push(this.datePipe.transform(label, this.formato));
          });
          this.arrayCharts.push(new GraficaModelo(chart));
        });

        if (this.arrayCharts.length < 1){
          Swal({
            title: '¡Upss!',
            text: "No se encontraron resultados según los parametros dados",
            type: 'info'
          });
        }

      } else {
        Swal({
          title: '¡Upss!',
          text: "No se encontraron resultados según los parametros dados",
          type: 'info'
        });
      }
    }).catch((error) => {

    });
  }

  changePipe = () => {

    switch (this.strTipo) {
      case 'ano':
        this.formato = 'y';
        break;
      case 'mes':
        this.formato = 'M';
        break;
      case 'rango':
        this.formato = 'd/M/yyyy';
        break;
      default:
        this.formato = "Hola";
        break;
    }
  }

}
