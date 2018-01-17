import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const name = this.route.snapshot.params['name'];
    console.log(this.route.snapshot.queryParams);

    this.user = {
      id, name
    };

    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
