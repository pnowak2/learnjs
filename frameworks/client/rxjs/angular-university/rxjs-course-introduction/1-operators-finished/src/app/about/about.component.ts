import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge } from 'rxjs';
import { delayWhen, filter, map, take, timeout, takeUntil } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');
        const sub = http$.subscribe(console.log);

        setTimeout(() => {
            sub.unsubscribe();
        });
    }
}






