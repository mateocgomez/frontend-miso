import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion, ComentarioCancion } from './cancion';
import { Album } from '../album/album';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private backUrl: string = "https://cors-anywhere.herokuapp.com/https://app-sqlachemy.herokuapp.com"

  constructor(private http: HttpClient) { }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  getCanciones(token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/canciones`, {headers: headers})
  }

  getAlbumesCancion(cancionId: number): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.backUrl}/cancion/${cancionId}/albumes`)
  }

  crearCancion(cancion: Cancion, token: string):Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Cancion>(`${this.backUrl}/canciones`, cancion, {headers: headers})
  }

  getCancion(cancionId: number): Observable<Cancion>{
    return this.http.get<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  editarCancion(cancion: Cancion, cancionId: number):Observable<Cancion>{
    return this.http.put<Cancion>(`${this.backUrl}/cancion/${cancionId}`, cancion)
  }

  eliminarCancion(cancionId: number): Observable<Cancion>{
    return this.http.delete<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  cambiarAccesoCancion(status: string, cancionId: number, token: string): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const params = {
      "acceso": status
    }

    return this.http.patch<Album>(`${this.backUrl}/cancion/${cancionId}`, params, {headers: headers})
  }

  crearComentarioCancion(comentario: ComentarioCancion, token: string, cancionId: number): Observable<ComentarioCancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<ComentarioCancion>(`${this.backUrl}/cancion/${cancionId}/comentarios`, comentario, {headers: headers})
  }

  obtenerComentariosCancion(token: string, cancionId: number): Observable<ComentarioCancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<ComentarioCancion[]>(`${this.backUrl}/cancion/${cancionId}/comentarios`, {headers: headers})
  }

}
