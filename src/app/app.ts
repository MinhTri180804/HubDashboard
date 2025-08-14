import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layouts/header-component/header-component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutService } from './services/layout-service';
import { SidenavGroupComponent } from './components/sidenav-group-component/sidenav-group-component';
import { SidenavInfo } from './types/sidebar';
import { BreadcrumbComponent } from './components/breadcrumb-component/breadcrumb-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    SidenavGroupComponent,
    BreadcrumbComponent,
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
