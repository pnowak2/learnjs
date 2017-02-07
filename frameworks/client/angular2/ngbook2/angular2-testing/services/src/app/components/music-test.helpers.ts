import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

const mockSpotifyService: MockSpotifyService = new MockSpotifyService();

export function configureMusicTests() {
  TestBed.configureTestingModule({
    imports: [
      {
        ngModule: RouterTestingModule,
        providers: [provideRoutes(routerConfig)]
      },
      TestModule
    ],
    providers: [
      mockSpotifyService.getProviders(),
      {
        provide: ActivatedRoute,
        useFactory: (r: Router) => {
          r.routerState.root
        }, deps: [Router]
      }
    ]
  });
}