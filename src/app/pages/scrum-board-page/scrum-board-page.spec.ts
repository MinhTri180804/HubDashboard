import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumBoardPage } from './scrum-board-page';

describe('ScrumBoardPage', () => {
  let component: ScrumBoardPage;
  let fixture: ComponentFixture<ScrumBoardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrumBoardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrumBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
