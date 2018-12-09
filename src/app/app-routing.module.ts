import { ListaRecorridosComponent } from './lista-recorridos/lista-recorridos.component';
import { ListaArtistasComponent } from './lista-artistas/lista-artistas.component';
import { NuevoEventoComponent } from './nuevo-evento/nuevo-evento.component';
import { ListaMuseosComponent } from './lista-museos/lista-museos.component';
import { ListaEncuestasComponent } from './lista-encuestas/lista-encuestas.component';
import { ListaCometariosComponent } from './lista-cometarios/lista-cometarios.component';
import { PerfilMuseoComponent } from './perfil-museo/perfil-museo.component';
import { NuevaSalaComponent } from './nueva-sala/nueva-sala.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaObraComponent } from './nueva-obra/nueva-obra.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { NuevaEncuestaComponent } from './nueva-encuesta/nueva-encuesta.component';
import { NuevoRecorridoComponent } from './nuevo-recorrido/nuevo-recorrido.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { NuevoArtistaComponent } from './nuevo-artista/nuevo-artista.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  /**
   * COMO USUARIO ADMINISTRADOR DE INMUSE
   */
  { path: 'nuevo-museo', component: PerfilMuseoComponent },
  { path: 'lista-museos', component: ListaMuseosComponent },


  /**
   * COMO USUARIO ADMINISTRATIVO DEL MUSEO
  */
  { path: 'perfil-museo', component: PerfilMuseoComponent },
  { path: 'estadisticas', component: EstadisticasComponent },

  { path: 'nueva-sala', component: NuevaSalaComponent },
  { path: 'nueva-obra', component: NuevaObraComponent },
  { path: 'nuevo-evento', component: NuevoEventoComponent },
  { path: 'nuevo-artista', component: NuevoArtistaComponent },
  { path: 'nueva-encuesta', component: NuevaEncuestaComponent },
  { path: 'nuevo-recorrido', component: NuevoRecorridoComponent },

  { path: 'lista-salas', component: ListaSalasComponent },
  { path: 'lista-obras', component: ListaObrasComponent },
  { path: 'lista-eventos', component: ListaEventosComponent },
  { path: 'lista-artistas', component: ListaArtistasComponent },
  { path: 'lista-comentarios', component: ListaCometariosComponent },
  { path: 'lista-encuestas', component: ListaEncuestasComponent },
  { path: 'lista-recorridos', component: ListaRecorridosComponent },

  { path: '**', pathMatch:'full', redirectTo: '/' } //Cuando no encuentra alguna ruta de las especificadas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
