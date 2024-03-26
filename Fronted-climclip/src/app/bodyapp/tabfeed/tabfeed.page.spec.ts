import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabfeedPage } from './tabfeed.page';

describe('TabfeedPage', () => {
  let component: TabfeedPage;
  let fixture: ComponentFixture<TabfeedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabfeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
