export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public clave: any,
    public esAdmin: boolean
  ) {}
}
