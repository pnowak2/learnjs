import { Address, Hero } from './../models/data';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { states } from '../models/data';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  heroForm: FormGroup;
  states = states;
  hero = new Hero();

  constructor(private fb: FormBuilder) {
    this.createForm();

    this.hero.name = 'my name';
    this.hero.addresses = [];

    this.heroForm.setValue({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address(),
      power: 2,
      sidekick: 'test'
    });

    this.heroForm.patchValue({
      name: 'boo'
    });

    this.heroForm.reset({
      name: 'provide name'
    });
  }

  createForm() {
    this.heroForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required],
      address: this.fb.group(new Address()),
      power: '',
      sidekick: ''
    });
  }

  // next: Use FormArray to present an array of FormGroups
}
