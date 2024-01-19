import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistroComponent } from './listar-registro.component';

describe('ListarRegistrosComponent', () => {
  let component: ListarRegistroComponent;
  let fixture: ComponentFixture<ListarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
