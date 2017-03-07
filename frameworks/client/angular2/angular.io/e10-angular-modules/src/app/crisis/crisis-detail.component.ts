import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

@Component({
  selector: 'app-crisis',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params['id'], 10);
  }
}
