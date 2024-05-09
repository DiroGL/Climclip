export interface Perfil {
    usuario: string;
    seguidores: number;
    seguidos: number;
    publicaciones: number;
  }
  
export interface PerfilesJSON {
    perfiles: Perfil[];
  }