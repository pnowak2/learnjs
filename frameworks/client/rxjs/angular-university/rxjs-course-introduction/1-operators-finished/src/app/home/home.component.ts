import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, Observable, of, timer, throwError } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, retry, finalize, take } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
        const http$: Observable<Course[]> = createHttpObservable('/api/courses');
        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log('http request executed')),
                map(res => Object.values(res['payload'] as Course)),
                shareReplay(),
                retryWhen(errors => errors.pipe(
                    delayWhen(() => timer(2000)),
                    take(2)
                ))
            );

        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'BEGINNER'))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'ADVANCED'))
            );
    }

}
