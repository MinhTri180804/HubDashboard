import {
  AfterViewChecked,
  Component,
  computed,
  inject,
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
export class TaskStatusGaugeComponent {
  private _taskAnalyticsService = inject(TaskAnalyticsService);

  data = this._taskAnalyticsService.performance.value;
  isLoading = this._taskAnalyticsService.performance.isLoading;

  statisticData = computed(() => {
    if (!this.data()) {
      return [];
    }
    return Object.entries(this.data()!.statistics).map(([name, value]) => ({
      name,
      value,
    }));
  });

  percentRotation = computed(() => this.data()?.percentRotation);

  constructor() {}
}
