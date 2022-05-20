import { LoginService } from './login.service';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario';

describe('ValueService', () => {
  let service: LoginService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LoginService(httpClientSpy as any);
  });

  it('Se crea correctamente el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Retorna datos de login correctos'),
    (done: DoneFn) => {
      const mockUser: Usuario = {
        id: 1,
        nombre: 'admin',
        clave: 'admin',
        esAdmin: true,
      };

      service
        .obtenerUsuarios(mockUser.nombre, mockUser.clave)
        .subscribe((res) => {
          expect(res[0]).toEqual(mockUser);
        });
    };
});
