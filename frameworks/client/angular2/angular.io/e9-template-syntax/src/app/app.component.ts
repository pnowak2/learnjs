import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  imageUrl = 'http://kingofwallpapers.com/image/image-025.jpg';
  ariaLabel = 'my aria label';
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';

  onSave() {
    console.log('saved');
  }
}
