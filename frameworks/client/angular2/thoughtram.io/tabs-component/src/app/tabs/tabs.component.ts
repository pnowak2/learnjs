import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  constructor() { }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter(tab => tab.active);
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => tab.active = false);

    tab.active = true;
  }
}
