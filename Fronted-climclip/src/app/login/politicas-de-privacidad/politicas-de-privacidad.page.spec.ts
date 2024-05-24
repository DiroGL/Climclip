import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticasDePrivacidadPage } from './politicas-de-privacidad.page';

describe('PoliticasDePrivacidadPage', () => {
  let component: PoliticasDePrivacidadPage;
  let fixture: ComponentFixture<PoliticasDePrivacidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasDePrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
