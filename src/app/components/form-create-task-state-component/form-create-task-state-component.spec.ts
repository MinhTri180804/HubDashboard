import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTaskStateComponent } from './form-create-task-state-component';

describe('FormCreateTaskStateComponent', () => {
  let component: FormCreateTaskStateComponent;
  let fixture: ComponentFixture<FormCreateTaskStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTaskStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateTaskStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
