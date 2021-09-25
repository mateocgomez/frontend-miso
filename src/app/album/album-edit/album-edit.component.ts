import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Album, Medio } from '../album';
import { AlbumService } from '../album.service';
import { showSuccess } from '../../shared/pipes/showSuccess/showSuccess.pipe';
import { stateError } from '../../shared/pipes/stateError/stateError.pipe';
import { showError } from '../../shared/pipes/showError/showError.pipe';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  userId: number;
  token: string;
  albumId: number;
  albumForm!: FormGroup;
  medios:Array<Medio> = [
    {
      llave: "DISCO",
      valor: 1
    },
    {
      llave: "CASETE",
      valor: 2
    },
    {
      llave: "CD",
      valor: 3
    }
  ]

  constructor(
    
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private success: showSuccess,
    private errorState: stateError,
    private error: showError,

    ) { }

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.error.transform("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.albumService.getAlbum(parseInt(this.router.snapshot.params.albumId))
      .subscribe(album => {
        this.albumId = album.id
        this.albumForm = this.formBuilder.group({
          titulo: [album.titulo, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
          anio: [album.anio, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
          descripcion: [album.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
          medio: [album.medio.llave, [Validators.required]]
        })
      })
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
    }
  }

  cancelCreate(){
    this.albumForm.reset()
    this.routerPath.navigate([`/albumes/${this.userId}/${this.token}`])
  }

  editarAlbum(newAlbum: Album){
    console.log(newAlbum)
    this.albumForm.get('anio')?.setValue(parseInt(this.albumForm.get('anio')?.value))
    this.albumService.editarAlbum(this.userId, this.token, this.albumId, newAlbum)
    .subscribe(album => {
      this.success.transform($localize`El album ${album.titulo} fue editado`, $localize`Edición exitosa`)
      this.albumForm.reset()
      this.routerPath.navigate([`/albumes/${this.userId}/${this.token}`])
    },
    error=> this.errorState.transform(error));
  }

}
