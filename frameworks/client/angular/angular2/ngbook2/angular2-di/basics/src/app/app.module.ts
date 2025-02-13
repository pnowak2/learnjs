import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OtherService } from './services/other.service';
import { ParamService } from './services/with-param.service';
import { ApiService } from './services/ApiService';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    OtherService,
    { provide: ApiService, useClass: ApiService },
    // Equivalent to above other
    // { provide: OtherService, useClass: OtherService }
    // {
    //   // for some reason does not compile..
    //   provide: ParamService, 
    //   useFactory: (): ParamService => new ParamService('custom')
    // }
    { provide: 'API_URL', useValue: 'http://my.api.com/v1' },
    { provide: 'OTHER_URL', useExisting: 'API_URL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

// below are equivalent
// (): ParamService => new ParamService('custom')
// (function () { return new ParamService('custom'); });