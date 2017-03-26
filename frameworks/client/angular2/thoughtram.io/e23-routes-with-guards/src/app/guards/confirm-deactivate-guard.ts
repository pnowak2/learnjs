import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';

export class ConfirmDeactivateGuard implements CanDeactivate<DetailComponent> {
  canDeactivate(target: DetailComponent) {
    if (target.hasChanges()) {
      return window.confirm('Do you really want to cancel?');
    }
    return true;
  }
}
