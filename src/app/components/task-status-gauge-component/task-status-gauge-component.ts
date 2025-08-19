import { Component, input, Input } from '@angular/core';

type Segment = { color: string; portion: number };

@Component({
  selector: 'app-task-status-gauge-component',
  standalone: true,
  imports: [],
  templateUrl: './task-status-gauge-component.html',
  styleUrl: './task-status-gauge-component.scss',
})
export class TaskStatusGaugeComponent {
  min = input<number>(0);
  max = input<number>(100);
  value = input<number>(0);
}
