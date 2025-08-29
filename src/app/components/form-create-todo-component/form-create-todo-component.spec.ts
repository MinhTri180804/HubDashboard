import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTodoComponent } from './form-create-todo-component';

describe('FormAddTodoComponent', () => {
  let component: FormCreateTodoComponent;
  let fixture: ComponentFixture<FormCreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
