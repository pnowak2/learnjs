import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngfor',
  templateUrl: './ngfor.component.html',
  styleUrls: ['./ngfor.component.css']
})
export class NgforComponent implements OnInit {
  cities = [{
    country: 'poland',
    city: 'katowice'
  },
  {
    country: 'belgium',
    city: 'bruxelles'
  },
  {
    country: 'luxembourg',
    city: 'luxembourg'
  }];

  constructor() { }

  ngOnInit() {
  }

}
