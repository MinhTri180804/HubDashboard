import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../card-component/card-component';

@Component({
  selector: 'app-card-task-component',
  imports: [CardComponent, MatIconModule],
  templateUrl: './card-task-component.html',
  styleUrl: './card-task-component.scss',
})
export class CardTaskComponent {
  cardTitle = input.required<string>();
  cardTitleQuantity = input.required<number>();
}
