import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb-component/breadcrumb-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent } from '../../components/dropdown-component/dropdown-component';
import { DropdownItemComponent } from '../../components/dropdown-item-component/dropdown-item-component';

@Component({
  selector: 'app-scrum-board-page',
  imports: [
    BreadcrumbComponent,
    ButtonComponent,
    MatIconModule,
    DropdownComponent,
    DropdownItemComponent,
  ],
  templateUrl: './scrum-board-page.html',
  styleUrl: './scrum-board-page.scss',
})
export class ScrumBoardPage {
  projectsMockData = [
    {
      name: 'project/mobile-app-dev',
    },
    {
      name: 'project/bootstrap-5',
    },
    {
      name: 'project/mvc-version',
    },
    {
      name: 'project/ruby-version',
    },
  ];
}
