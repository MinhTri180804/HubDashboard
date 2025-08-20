import {
  Component,
  computed,
  input,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  TaskAnalyticsPerformanceData,
  TaskAnalyticsService,
} from '../../services/task-analytics-service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CardComponent } from '../card-component/card-component';

type Segment = { color: string; portion: number };

@Component({
  selector: 'app-task-status-gauge-component',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './task-status-gauge-component.html',
  styleUrl: './task-status-gauge-component.scss',
})
export class TaskStatusGaugeComponent implements OnInit, OnDestroy {
  isLoading = signal<boolean>(true);
  data = signal<TaskAnalyticsPerformanceData | null>(null);
  statisticData = computed(() => {
    if (!this.data()) {
      return [];
    }
    return Object.entries(this.data()!.statistics).map(([name, value]) => ({
      name,
      value,
    }));
  });
  private destroy$ = new Subject<void>();

  percentRotation = computed(() => this.data()?.percentRotation);

  constructor(private _taskAnalyticsService: TaskAnalyticsService) {}

  ngOnInit(): void {
    this._taskAnalyticsService
      .fetchPerformance()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.data.set(response);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('[ERROR] Error fetch performance analytics: ', error);
          this.isLoading.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
