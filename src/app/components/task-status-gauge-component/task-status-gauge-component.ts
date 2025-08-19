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

type Segment = { color: string; portion: number };

@Component({
  selector: 'app-task-status-gauge-component',
  standalone: true,
  imports: [],
  templateUrl: './task-status-gauge-component.html',
  styleUrl: './task-status-gauge-component.scss',
})
export class TaskStatusGaugeComponent implements OnInit, OnDestroy {
  data = signal<TaskAnalyticsPerformanceData | null>(null);
  private destroy$ = new Subject<void>();

  percentRotation = computed(() => this.data()?.percentRotation);

  constructor(private _taskAnalyticsService: TaskAnalyticsService) {}

  ngOnInit(): void {
    this._taskAnalyticsService
      .fetchPerformance()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.data.set(response);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
