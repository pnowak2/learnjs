import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();

  selectedImage: string;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.DataUrl,
    }).then((image) => {
        this.selectedImage = image.dataUrl;
        this.imagePick.next(image.dataUrl);
      })
      .catch((error) => {
        this.alertCtrl
          .create({
            header: 'Cannot take image',
            message: 'Problem while taking a picture',
          })
          .then((alertEl) => {
            alertEl.present();
          });

        return false;
      });
  }
}
