import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scrum-board-page',
  imports: [BreadcrumbComponent, ButtonComponent, MatIconModule],
  templateUrl: './scrum-board-page.html',
  styleUrl: './scrum-board-page.scss',
})
export class ScrumBoardPage {}
