import { Component } from '@angular/core';
import { ReflectiveInjector, Inject } from '@angular/core';
import { MyService } from './services/my.service';
import { OtherService } from './services/other.service';
import { ParamService } from './services/with-param.service';
import { ApiService } from './services/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myService: MyService;
  apiService: ApiService;

  constructor(
    private otherService: OtherService,
    // private paramService: ParamService,
    @Inject(ApiService) apiService: ApiService,
    @Inject('API_URL') private url: string,
    @Inject('OTHER_URL') private otherUrl: string,
    ) {
    let injector: any = ReflectiveInjector.resolveAndCreate([MyService]);
    this.myService = injector.get(MyService);

    console.log('Same instance?', this.myService === injector.get(MyService));
  }

  invokeService() {
    console.log('MyService returned', this.myService.getValue());
  }

  invokeOtherService() {
    console.log('OtherService returned', this.otherService.getValue());
  }

  invokeParamService() {
    // console.log('ParamService returned', this.paramService.getValue());
  }

  invokeValueService() {
    console.log('Value returned', this.url);
    console.log('Aliased Value returned', this.otherUrl);
  }

  invokeApiService() {
    console.log('APIService returned', this.apiService.get());
  }
}
