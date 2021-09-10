export interface Publicacion {
    id_publicacion: number;
    titulo: string;
    nombre_perfil: string;
    fecha_publicacion: Date;
    descripcion:string;
    enlace:string;
    profesion:string;
    estado_profesion: string;
    ruta_archivo: string;
    id_tipo_publicacion:number;
    id_estado_publicacion : number;
    id_usuario : number;
    id_carrera: number;
}