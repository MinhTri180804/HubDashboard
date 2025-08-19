import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTaskSummaryComponent } from './analytics-task-summary-component';

describe('AnalyticsTaskSummaryComponent', () => {
  let component: AnalyticsTaskSummaryComponent;
  let fixture: ComponentFixture<AnalyticsTaskSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsTaskSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsTaskSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
