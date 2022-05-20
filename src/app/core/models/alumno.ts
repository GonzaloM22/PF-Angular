export class Alumno {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public sexo: string,
    public legajo: number,
    public email: string,
    public observaciones?: string
  ) {}
}
