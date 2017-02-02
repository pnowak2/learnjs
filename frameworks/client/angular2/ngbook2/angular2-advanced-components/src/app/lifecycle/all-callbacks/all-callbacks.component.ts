import {
  Component, OnInit, OnDestroy, DoCheck,
  OnChanges, AfterContentInit,
  AfterContentChecked, AfterViewInit,
  AfterViewChecked
} from '@angular/core';

@Component({
  selector: 'all-callbacks',
  templateUrl: './all-callbacks.component.html',
  styleUrls: ['./all-callbacks.component.css']
})
export class AllCallbacksComponent implements OnInit, OnInit, OnDestroy, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  counter: number;

  constructor() {
    console.log('[constructor]')
  }

  inc() {
    console.log('AfterCmp --------- [counter]');
    this.counter += 1;
  }
  ngOnInit() {
    console.log('AfterCmp - OnInit');
  }
  ngOnDestroy() {
    console.log('AfterCmp - OnDestroy');
  }
  ngDoCheck() {
    console.log('AfterCmp - DoCheck');
  }
  ngOnChanges() {
    console.log('AfterCmp - OnChanges');
  }
  ngAfterContentInit() {
    console.log('AfterCmp - AfterContentInit');
  }
  ngAfterContentChecked() {
    console.log('AfterCmp - AfterContentChecked');
  }
  ngAfterViewInit() {
    console.log('AfterCmp - AfterViewInit');
  }
  ngAfterViewChecked() {
    console.log('AfterCmp - AfterViewChecked');
  }
}
