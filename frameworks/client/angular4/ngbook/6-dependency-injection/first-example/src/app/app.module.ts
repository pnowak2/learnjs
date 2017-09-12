import { Metric } from './services/metric.interface';
import { Analytics } from './services/analytics.interface';
import { AnalyticsService } from './services/analytics.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InjectorExampleComponent } from './injector-example/injector-example.component';
import { NgmoduleInjectionComponent } from './ngmodule-injection/ngmodule-injection.component';

@NgModule({
  declarations: [
    AppComponent,
    InjectorExampleComponent,
    NgmoduleInjectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: UserService, useClass: UserService
  }, {
    provide: 'API_URL', useValue: 'http://my.api.com/v1'
  }, {
    provide: AnalyticsService, useFactory: (url: string) => {
      const analyticsImpl: Analytics = {
        recordEvent(metric: Metric): void {
          console.log('The metric is: ', metric);
        }
      };

      return new AnalyticsService(analyticsImpl);
    }, deps: ['API_URL']
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
