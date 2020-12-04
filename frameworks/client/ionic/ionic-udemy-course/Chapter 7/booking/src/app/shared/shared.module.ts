import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        LocationPickerComponent,
        MapModalComponent
    ],
    exports: [
        LocationPickerComponent,
        MapModalComponent
    ]
})
export class SharedModule { }
