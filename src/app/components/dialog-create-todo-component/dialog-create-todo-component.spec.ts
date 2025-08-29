import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateTodoComponent } from './dialog-create-todo-component';

describe('DialogCreateTodoComponent', () => {
  let component: DialogCreateTodoComponent;
  let fixture: ComponentFixture<DialogCreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
