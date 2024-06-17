import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaUsersPage } from './lista-users.page';

describe('ListaUsersPage', () => {
  let component: ListaUsersPage;
  let fixture: ComponentFixture<ListaUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
