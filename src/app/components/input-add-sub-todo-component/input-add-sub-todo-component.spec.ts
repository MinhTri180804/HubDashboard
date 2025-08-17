import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddSubTodoComponent } from './input-add-sub-todo-component';

describe('InputAddSubTodoComponent', () => {
  let component: InputAddSubTodoComponent;
  let fixture: ComponentFixture<InputAddSubTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAddSubTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAddSubTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
