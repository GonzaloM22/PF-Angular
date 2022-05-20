export class Curso {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public duracion: string,
    public fechaInicio: Date,
    public precio: number
  ) {}
}
