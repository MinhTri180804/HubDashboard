import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateTaskStateComponent } from './dialog-create-task-state-component';

describe('DialogCreateTaskStateComponent', () => {
  let component: DialogCreateTaskStateComponent;
  let fixture: ComponentFixture<DialogCreateTaskStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateTaskStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateTaskStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
