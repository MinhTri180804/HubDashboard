import { LayoutService } from './../../../services/layout-service';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  constructor(private layoutService: LayoutService) {}
  handleToggle() {
    this.layoutService.onToggle();
  }
}
