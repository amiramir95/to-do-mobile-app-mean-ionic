import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTasksPage } from './home-tasks.page';

describe('HomeTasksPage', () => {
  let component: HomeTasksPage;
  let fixture: ComponentFixture<HomeTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTasksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
