import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../components/breadcrumb-component/breadcrumb-component";
import { CardComponent } from "../../components/card-component/card-component";

@Component({
  selector: 'app-analytics-page',
  imports: [BreadcrumbComponent, CardComponent],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss'
})
export class AnalyticsPage {

}
