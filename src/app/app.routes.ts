import { Routes } from '@angular/router';
import { ScrumBoardPage } from './pages/scrum-board-page/scrum-board-page';
import { AnalyticsPage } from './pages/analytics-page/analytics-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'board-scrum',
  },
  {
    path: 'board-scrum',
    pathMatch: 'full',
    component: ScrumBoardPage,
  },

  {
    path: 'analytics',
    pathMatch: 'full',
    component: AnalyticsPage,
  },
];
