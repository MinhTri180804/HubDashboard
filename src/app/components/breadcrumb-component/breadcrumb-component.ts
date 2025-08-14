import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-component',
  imports: [],
  templateUrl: './breadcrumb-component.html',
  styleUrl: './breadcrumb-component.scss',
})
export class BreadcrumbComponent {
  mockBreadcrumb: string[] = ['pages', 'scrum board'];
}
