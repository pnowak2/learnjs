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
        let counter = 0;

        document.addEventListener('click', evt => {
            console.log(evt);

            const handlerOut = setTimeout(() => {
                console.log('finished.');

                const handler = setInterval(() => {
                    console.log(counter);
                    counter++;
                }, 1000);
            }, 3000);
        });
    }
}






