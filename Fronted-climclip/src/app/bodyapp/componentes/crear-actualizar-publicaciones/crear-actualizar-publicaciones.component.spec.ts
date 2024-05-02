import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearActualizarPublicacionesComponent } from './crear-actualizar-publicaciones.component';

describe('CrearActualizarPublicacionesComponent', () => {
  let component: CrearActualizarPublicacionesComponent;
  let fixture: ComponentFixture<CrearActualizarPublicacionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActualizarPublicacionesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearActualizarPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
