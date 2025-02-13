import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngnonbindable',
  templateUrl: './ngnonbindable.component.html',
  styleUrls: ['./ngnonbindable.component.css']
})
export class NgnonbindableComponent implements OnInit {
  content = 'This is my content';

  constructor() { }

  ngOnInit() {
  }

}
