import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ByIdComponent } from '../by-id/by-id.component';
import { InterestComponent } from '../interest/interest.component';
import { SportifyComponent } from '../sportify/sportify.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'interest', component: InterestComponent },
  { path: 'sportify', component: SportifyComponent },
  { path: ':id', component: ByIdComponent }  
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  goToProduct(id: string): void {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }
}
