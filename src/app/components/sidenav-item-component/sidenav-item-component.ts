import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidenavItemInfo } from '../../types/sidebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-item-component',
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidenav-item-component.html',
  styleUrl: './sidenav-item-component.scss',
})
export class SidenavItemComponent {
  data = input.required<SidenavItemInfo>({
    alias: 'sidenav-item-data',
  });
}
