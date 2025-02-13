import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private numbsSubscription: Subscription;
  private customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable
    .interval(1000)
    .map((n: number) => n * 2);

    this.numbsSubscription = myNumbers.subscribe(
      (n: number) => {
        console.log(n);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    this.customSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );
  }

  ngOnDestroy() {
    this.numbsSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }

}
