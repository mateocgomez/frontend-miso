import { Component, OnInit } from '@angular/core';
import { Acceso, Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  constructor(
    private cancionService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  canciones: Array<Cancion>
  mostrarCanciones: Array<Cancion>
  cancionSeleccionada: Cancion
  indiceSeleccionado: number = 0

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getCanciones();
    }
  }

  getCanciones():void{
    this.cancionService.getCanciones(this.token)
    .subscribe(canciones => {
      this.canciones = canciones
      this.mostrarCanciones = canciones
      this.onSelect(this.mostrarCanciones[0], 0)
    })
  }

  onSelect(cancion: Cancion, indice: number){
    this.indiceSeleccionado = indice
    this.cancionSeleccionada = cancion
    this.cancionService.getAlbumesCancion(cancion.id)
    .subscribe(albumes => {
      this.cancionSeleccionada.albumes = albumes
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    })
    
  }

  buscarCancion(busqueda: string){
    let cancionesBusqueda: Array<Cancion> = []
    this.canciones.map( cancion => {
      if(cancion.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())){
        cancionesBusqueda.push(cancion)
      }
    })
    this.mostrarCanciones = cancionesBusqueda
  }

  eliminarCancion(){
    this.cancionService.eliminarCancion(this.cancionSeleccionada.id)
    .subscribe(cancion => {
      this.ngOnInit()
      this.showSuccess()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  cambiarAccesoCancion(){
    let status = 'PRIVADO'
    if(this.cancionSeleccionada.acceso.llave == 'PRIVADO' ) {
      status = "PUBLICO"
    }

    this.cancionService.cambiarAccesoCancion(status, this.cancionSeleccionada.id, this.token)
    .subscribe(album => {
      this.ngOnInit();
      this.showStatusChangedSuccess(status);
    },
    error=> {
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })
    this.ngOnInit()
  }

  irCrearCancion(){
    this.routerPath.navigate([`/canciones/create/${this.userId}/${this.token}`])
  }

  showError(error: string){
    this.toastr.error(error, $localize`Error de autenticación`)
  }

  showSuccess() {
    this.toastr.success($localize`La canción fue eliminada`, $localize`Eliminada exitosamente`);
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showStatusChangedSuccess(status: string) {
    this.toastr.success(`Canción marcada como ${status}`, "Modificado exitosamente");
  }
}
