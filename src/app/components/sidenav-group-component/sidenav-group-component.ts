import { Component, input } from '@angular/core';
import { SidenavInfo } from '../../types/sidebar';
import { SidenavItemComponent } from '../sidenav-item-component/sidenav-item-component';

@Component({
  selector: 'app-sidenav-group-component',
  imports: [SidenavItemComponent],
  templateUrl: './sidenav-group-component.html',
  styleUrl: './sidenav-group-component.scss',
})
export class SidenavGroupComponent {
  data = input.required<SidenavInfo>({
    alias: 'sidenav-group-data',
  });
}
