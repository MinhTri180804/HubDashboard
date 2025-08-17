import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectEmployeeComponent } from './multi-select-employee-component';

describe('MultiSelectEmployeeComponent', () => {
  let component: MultiSelectEmployeeComponent;
  let fixture: ComponentFixture<MultiSelectEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
