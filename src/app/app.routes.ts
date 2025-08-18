import { Routes } from '@angular/router';
import { ScrumBoardPage } from './pages/scrum-board-page/scrum-board-page';
import { AnalyticsPage } from './pages/analytics-page/analytics-page';

export const routes: Routes = [
  {
    path: '',
    component: ScrumBoardPage,
  },

  {
    path: 'analytics',
    component: AnalyticsPage,
  },
];
