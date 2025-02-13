import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required], [this.forbiddenAsync.bind(this)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'status': new FormControl('Critical', [Validators.required]),
      'roles': new FormArray([
        new FormControl('Boo')
      ])
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onAddRole() {
    const fa = (this.form.get('roles') as FormArray);
    fa.push(new FormControl('', Validators.required));
  }

  forbidden(control: FormControl): { [key: string]: boolean } {
    if (control.value === 'test') {
      return {
        forbidden: true
      };
    } else {
      return null;
    }
  }

  forbiddenAsync(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({
            forbidden: true
          });
        } else {
          resolve(null);
        }

      }, 1500);
    });
  }
}
