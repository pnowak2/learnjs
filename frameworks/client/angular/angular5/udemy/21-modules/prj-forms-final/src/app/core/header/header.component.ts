import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    public dataStorageService: DataStorageService,
    public authService: AuthService
  ) { }

  onSaveData() {
    this.dataStorageService
      .storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
