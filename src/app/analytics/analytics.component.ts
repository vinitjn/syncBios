import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SyncTreeServicesService } from '../Services/sync-tree-services.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  username = 'vin0508';
  name = 'Angular';
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
  userId = 0;
  type = 'MONTH'; 
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Title';
  showYAxisLabel = true;
  yAxisLabel = 'Visitors Count';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  // data goes here
public single = []
public multi = [
  {
    "name": "China",
    "series": [
      {
        "name": "2018",
        "value": 2243772
      },
      {
        "name": "2017",
        "value": 1227770
      }
    ]
  },
  {
    "name": "USA",
    "series": [
      {
        "name": "2018",
        "value": 1126000
      },
      {
        "name": "2017",
        "value": 764666
      }
    ]
  },
  {
    "name": "Norway",
    "series": [
      {
        "name": "2018",
        "value": 296215
      },
      {
        "name": "2017",
        "value": 209122
      }
    ]
  },
  {
    "name": "Japan",
    "series": [
      {
        "name": "2018",
        "value": 257363
      },
      {
        "name": "2017",
        "value": 205350
      }
    ]
  },
  {
    "name": "Germany",
    "series": [
      {
        "name": "2018",
        "value": 196750
      },
      {
        "name": "2017",
        "value": 129246
      }
    ]
  },
  {
    "name": "France",
    "series": [
      {
        "name": "2018",
        "value": 204617
      },
      {
        "name": "2017",
        "value": 149797
      }
    ]
  }
];

  constructor(private router: Router, public syncTreeServicesService: SyncTreeServicesService) { }

  ngOnInit() {
    this.getVisitAnalysis();
  }

  redirectToBioPage(){
    this.router.navigate(['/synctrees/' + this.username]);
  }

  getVisitAnalysis(){
    this.syncTreeServicesService.getVisitAnalysis(this.userId,this.type).subscribe( response => {
      this.single = response;
    //  this.single  = [
    //     {
    //       "name": "31/Jul",
    //       "value": 2
    //     },
    //     {
    //       "name": "30/Jul",
    //       "value": 1
    //     },
    //     {
    //       "name": "29/Jul",
    //       "value": 5
    //     },
    //     {
    //       "name": "28/Jul",
    //       "value": 4
    //     },
    //     {
    //       "name": "27/Jul",
    //       "value": 6
    //     },
    //     {
    //       "name": "26/Jul",
    //       "value": 4
    //     }
    //   ];
    })
  }
}
