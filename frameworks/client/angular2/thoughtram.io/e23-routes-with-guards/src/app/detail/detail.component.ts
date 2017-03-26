import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id: string;

  constructor(private route: ActivatedRoute) {
    route.params
      .map(params => params['id'])
      .subscribe(id => this.id = id);

    // Or
    // this.id = route.snapshot.params['id'];
  }

  hasChanges(): boolean {
    if (this.route.snapshot.params['id'] === '1') {
      return true;
    } else {
      return false;
    }
  }
}
