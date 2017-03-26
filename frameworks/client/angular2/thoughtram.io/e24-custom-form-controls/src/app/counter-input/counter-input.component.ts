import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export function createCounterRangeValidator(maxValue, minValue) {
  return function validateCounterRange(c: FormControl) {
    let err = {
      rangeError: {
        given: c.value,
        max: maxValue,
        min: minValue
      }
    };

    return (c.value > +maxValue || c.value < +minValue) ? err: null;
  }
}

@Component({
  selector: 'counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    },
    { 
      provide: NG_VALIDATORS,
      useValue: CounterInputComponent,
      multi: true
    }
  ]
})
export class CounterInputComponent implements ControlValueAccessor {

  @Input()
  _counterValue = 0; // notice the '_'

  @Input()
  counterRangeMax;

  @Input()
  counterRangeMin;

  validateFn:Function;

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(this._counterValue);
  }

  ngOnChanges(changes) {
    if (changes.counterRangeMin || changes.counterRangeMax) {
      this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }

  propagateChange = (_: any) => { };

  writeValue(value: any): void {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }
}
