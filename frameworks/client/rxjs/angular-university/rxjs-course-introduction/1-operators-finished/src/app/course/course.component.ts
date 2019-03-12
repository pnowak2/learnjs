import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, exhaustMap, throttle
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, interval } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { RxJsLogginLevel, debug } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];
        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
        .pipe(
            debug(RxJsLogginLevel.ERROR, 'course')
        );
    }

    ngAfterViewInit() {
        this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(evt => evt.target.value),
                startWith(''),
                debug(RxJsLogginLevel.INFO, 'search'),
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            );

        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(evt => evt.target.value),
                throttle((val) => interval(1200))
            ).subscribe(console.log);
    }

    loadLessons(search: string = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&filter=${search}&pageSize=100`)
            .pipe(
                map(res => res['payload'])
            );
    }


}
