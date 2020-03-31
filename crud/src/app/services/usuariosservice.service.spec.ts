import { TestBed } from '@angular/core/testing';

import { UsuariosserviceService } from './usuariosservice.service';

describe('UsuariosserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosserviceService = TestBed.get(UsuariosserviceService);
    expect(service).toBeTruthy();
  });
});
