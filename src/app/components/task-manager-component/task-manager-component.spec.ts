import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManagerComponent } from './task-manager-component';

describe('TodoManagerComponent', () => {
  let component: TodoManagerComponent;
  let fixture: ComponentFixture<TodoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
