import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public loadingPage = true;
  constructor() { }

  ngOnInit() {
    gapi.analytics.ready(() => {

      gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: environment.clientID
      });

      this.prepareCharts();

      this.loadingPage = false;
    });
  }

  prepareCharts() {
    const sessionsChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:date',
        'start-date': '30daysAgo',
        'end-date': 'today'
      },
      chart: {
        container: 'sessions-chart',
        type: 'LINE',
        options: {
          width: '100%'
        }
      }
    });

    const browsersChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'dimensions': 'ga:browser',
        'metrics': 'ga:pageviews',
        'sort': '-ga:pageviews',
        'start-date': '30daysAgo',
        'end-date': 'today',
        'max-results': 5
      },
      chart: {
        container: 'browsers-chart',
        type: 'PIE',
        options: {
          width: '100%'
        }
      }
    });

    const routesChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:pagePath',
        'start-date': '30daysAgo',
        'end-date': 'today',
        'max-results': 30
      },
      chart: {
        'container': 'routes-chart',
        'type': 'TABLE',
        'options': {
          'width': '100%'
        }
      }
    });

    const regionsChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:regionIsoCode',
        'start-date': '30daysAgo',
        'end-date': 'today'
      },
      chart: {
        'container': 'regions-chart',
        'type': 'GEO',
        'options': {
          'region': 'PL',
          'resolution': 'provinces',
          'width': '100%'
        }
      }
    });

    const citiesChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:city',
        'filters': 'ga:country==Poland',
        'start-date': '30daysAgo',
        'end-date': 'today'
      },
      chart: {
        'container': 'cities-chart',
        'type': 'COLUMN',
        'options': {
          'width': '100%'
        }
      }
    });

    const devicesChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        'ids': 'ga:187903917',
        'metrics': 'ga:sessions',
        'dimensions': 'ga:deviceCategory',
        'start-date': '30daysAgo',
        'end-date': 'today'
      },
      chart: {
        'container': 'devices-chart',
        'type': 'PIE',
        'options': {
          'region': 'PL',
          'resolution': 'provinces',
          'width': '100%'
        }
      }
    });

    sessionsChart.execute();
    browsersChart.execute();
    regionsChart.execute();
    devicesChart.execute();
    citiesChart.execute();
    routesChart.execute();
  }


}
