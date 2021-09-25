import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cancion } from '../cancion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { CancionService } from '../cancion.service';
import { ComentarioCancion } from '../cancion';

@Component({
  selector: 'app-cancion-comments',
  templateUrl: './cancion-comments.component.html',
  styleUrls: ['./cancion-comments.component.css']
})
export class CancionCommentsComponent implements OnInit {
  @Input() cancion: Cancion;

  userId: number;
  token: string;
  cancionCommentForm: FormGroup;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private cancionService: CancionService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.cancionCommentForm = this.formBuilder.group({
      texto: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    })

    if(this.cancion) {
      this.cancionService.obtenerComentariosCancion(this.token, this.cancion.id)
      .subscribe(comments => {
        this.cancion.comentarios = comments
      })
    }
  }

  randomizeUserImage(){
    return Math.floor(Math.random() * (5 - 1)) + 1;
  }

  createComentarioCancion(newComment: ComentarioCancion){
    newComment.usuario = this.userId.toString()
    this.cancionService.crearComentarioCancion(newComment, this.token, this.cancion.id)
    .subscribe(cancion => {
      this.showSuccess()
      this.cancionCommentForm.reset()
      this.ngOnInit();
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
  }

  showError(error: string){
    this.toastr.error(error, $localize`Error de autenticación`)
  }

  showWarning(warning: string){
    this.toastr.warning(warning, $localize`Error de autenticación`)
  }

  showSuccess() {
    this.toastr.success(`Su comentario fue agregado correctamente.`, "Comentado agregado");
  }
}
