import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavGroupComponent } from './sidenav-group-component';

describe('SidenavGroupComponent', () => {
  let component: SidenavGroupComponent;
  let fixture: ComponentFixture<SidenavGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
