import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaskPage } from './manage-task.page';

describe('AddTaskPage', () => {
  let component: ManageTaskPage;
  let fixture: ComponentFixture<ManageTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTaskPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
