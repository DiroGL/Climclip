export interface User{
    uid:string,
    email: string,
    password?:string,
    name:string,
    username:string,
    descripcion?: string,
    image?: string,
    bio? :string,
}