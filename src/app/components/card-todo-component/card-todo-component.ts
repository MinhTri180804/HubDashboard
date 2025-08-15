import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../card-component/card-component';

@Component({
  selector: 'app-card-todo-component',
  imports: [CardComponent, MatIconModule],
  templateUrl: './card-todo-component.html',
  styleUrl: './card-todo-component.scss',
})
export class CardTodoComponent {
  cardTitle = input.required<string>();
}
