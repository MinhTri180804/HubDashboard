import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layouts/header-component/header-component';
import { SidenavGroupComponent } from './components/sidenav-group-component/sidenav-group-component';
import { LayoutService } from './services/layout-service';
import { SidenavInfo } from './types/sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    SidenavGroupComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly layoutService = inject(LayoutService);

  sidenavData: SidenavInfo[] = [
    {
      groupTitle: 'Navigation',
      items: [
        {
          icon: 'dashboard_outline',
          name: 'dashboard',
        },
        {
          icon: 'analytics_outline',
          name: 'analytics',
        },
        {
          icon: 'email',
          name: 'email',
        },
      ],
    },
    {
      groupTitle: 'Navigation',
      items: [
        {
          icon: 'dashboard_outline',
          name: 'dashboard',
        },
        {
          icon: 'analytics_outline',
          name: 'analytics',
        },
        {
          icon: 'email',
          name: 'email',
        },
      ],
    },
  ];
}
