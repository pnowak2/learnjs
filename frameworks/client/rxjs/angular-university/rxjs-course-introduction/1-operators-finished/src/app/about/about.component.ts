import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        const interval$ = timer(3000, 1000);

        const sub = interval$.subscribe(val => {
            console.log('stream 1 => ' + val);
        });

        setTimeout(() => sub.unsubscribe(), 5000);

        const click$ = fromEvent(document, 'click');
        click$.subscribe(
            evt => console.log('click => ' + evt),
            err => console.log('error => ' + err),
            () => console.log('complete'),
        );

    }
}






