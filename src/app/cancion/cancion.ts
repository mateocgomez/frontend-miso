export class Cancion {
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;
    acceso: Acceso;
    pertenece: boolean;
    albumes: Array<any>
    comentarios: Array<ComentarioCancion>

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string,
        acceso: Acceso,
        pertenece: boolean,
        albumes: Array<any>,
        comentarios: Array<ComentarioCancion>
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete
        this.acceso = acceso,
        this.pertenece = pertenece,
        this.albumes = albumes,
        this.comentarios = comentarios
    }
}

export class Acceso{
    llave: string;
    valor: number

    constructor(
        llave: string,
        valor:number
    ){
        this.llave = llave,
        this.valor = valor
    }
}

export class ComentarioCancion{
    id: number;
    texto: string;
    created_at: Date;
    usuario: string;
    canciones: Array<Cancion>

    constructor(
        id: number,
        texto: string,
        created_at: Date,
        usuario: string,
        canciones:  Array<Cancion>,
    ){
        this.id = id,
        this.texto = texto,
        this.created_at = created_at,
        this.usuario = usuario,
        this.canciones = canciones
    }
}
