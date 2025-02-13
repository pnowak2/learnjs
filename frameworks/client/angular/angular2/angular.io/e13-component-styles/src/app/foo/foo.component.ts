import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css'],
  host: {
    class: 'active'
  }
})
export class FooComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
