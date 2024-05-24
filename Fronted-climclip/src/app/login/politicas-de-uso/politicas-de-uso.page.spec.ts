import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticasDeUsoPage } from './politicas-de-uso.page';

describe('PoliticasDeUsoPage', () => {
  let component: PoliticasDeUsoPage;
  let fixture: ComponentFixture<PoliticasDeUsoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasDeUsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
