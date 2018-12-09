import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NuevaSalaComponent } from './nueva-sala/nueva-sala.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NuevaObraComponent } from './nueva-obra/nueva-obra.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { PerfilMuseoComponent } from './perfil-museo/perfil-museo.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ListaMuseosComponent } from './lista-museos/lista-museos.component';
import { ListaCometariosComponent } from './lista-cometarios/lista-cometarios.component';
import { NuevaEncuestaComponent } from './nueva-encuesta/nueva-encuesta.component';
import { ListaEncuestasComponent } from './lista-encuestas/lista-encuestas.component';
import { NuevoRecorridoComponent } from './nuevo-recorrido/nuevo-recorrido.component';
import { ModalObrasComponent } from './modal-obras/modal-obras.component';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { LoaderComponent } from './loader/loader.component';
import { NuevoEventoComponent } from './nuevo-evento/nuevo-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { ListaArtistasComponent } from './lista-artistas/lista-artistas.component';
import { NuevoArtistaComponent } from './nuevo-artista/nuevo-artista.component';

import { ChartsModule } from 'ng2-charts';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListaRecorridosComponent } from './lista-recorridos/lista-recorridos.component';
import { DatePickerComponent } from './date-picker/date-picker.component';



@NgModule({
  declarations: [
    AppComponent,
    NuevaSalaComponent,
    BreadcrumbComponent,
    NuevaObraComponent,
    ListaSalasComponent,
    ListaObrasComponent,
    PerfilMuseoComponent,
    ListaMuseosComponent,
    ListaCometariosComponent,
    NuevaEncuestaComponent,
    ListaEncuestasComponent,
    NuevoRecorridoComponent,
    ModalObrasComponent,
    LoaderComponent,
    NuevoEventoComponent,
    ListaEventosComponent,
    ListaArtistasComponent,
    NuevoArtistaComponent,
    EstadisticasComponent,
    ListaRecorridosComponent,
    DatePickerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    QRCodeModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    ChartsModule     
  ],
  exports:[
    
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  entryComponents:[
    ModalObrasComponent

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
