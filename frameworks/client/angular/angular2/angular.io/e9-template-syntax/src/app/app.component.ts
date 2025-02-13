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
  myValue = 'test';
  fontSizePx = 16;
  currentClasses = {
    saveable: true,
    modified: false,
    special: true
  };
  currentStyles = {
    // CSS styles: set per current state of component properties
    'font-style': true ? 'italic' : 'normal',
    'font-weight': false ? 'bold' : 'normal',
    'font-size': true ? '24px' : '12px'
  }
  heroName = 'Vanilla';
  heroes = ['a', 'b', 'c'];
  currentHero = 'WinterMan';
  birthDate = new Date(1980,4,28);

  onSave() {
    console.log('saved');
  }

  handleButtonClick(e: string) {
    console.log(e);
  }

  callPhone(phone: string) {
    console.log('calling', phone);
  }

  makeOlder(age: number) {
    console.log(age, age + 1);
  }
}
