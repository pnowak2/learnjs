import { Component, OnInit } from '@angular/core';
import { Crisis, CrisisService } from './crisis.service';

@Component({
  selector: 'app-crisis',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crisises: Promise<Crisis[]>;

  constructor(private crisisService: CrisisService) { }

  ngOnInit() {
    this.crisises = this.crisisService.getCrises();
  }
}
