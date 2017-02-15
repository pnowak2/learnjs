import {
  inject,
  fakeAsync,
  tick,
  TestBed,
  async
} from '@angular/core/testing'

import { MockBackend, MockConnection } from '@angular/http/testing';

import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { SpotifyService } from './spotify.service';

function expectURL(backend: MockBackend, url: string) {
  backend.connections.subscribe((c: MockConnection) => {
    expect(c.request.url).toBe(url);
    let response = new ResponseOptions({ body: '{"name": "piotr"}' });
    c.mockRespond(new Response(response));
  });
}

describe('SpotifyService', () => {
  let mockBackend: MockBackend;
  let spotifyService: SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        SpotifyService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(() => {
    mockBackend = TestBed.get(MockBackend);
    spotifyService = TestBed.get(SpotifyService);
  });

  describe('getTrack', () => {
    it('retrieves using the track ID', fakeAsync(() => {
      var res: any;

      expectURL(mockBackend, 'https://api.spotify.com/v1/tracks/TRACK_ID');

      spotifyService.getTrack('TRACK_ID').subscribe((_res) => {
        res = _res;
      });

      tick();

      expect(res.name).toBe('piotr');
    }));
  });

  describe('getAlbum', () => {
    it('retrieves using the album ID', fakeAsync(() => {
      var res: any;

      expectURL(mockBackend, 'https://api.spotify.com/v1/albums/ALBUM_ID');

      spotifyService.getAlbum('ALBUM_ID').subscribe((_res) => {
        res = _res;
      });

      tick();

      expect(res.name).toBe('piotr');
    }));
  });

  describe('searchTrack', () => {
    it('searches type and term', fakeAsync(() => {
      var res: any;

      expectURL(mockBackend, 'https://api.spotify.com/v1/search?q=TERM&type=track');

      spotifyService.searchTrack('TERM').subscribe((_res) => {
        res = _res;
      });

      tick();

      expect(res.name).toBe('piotr');
    }));
  });
});