import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItuneService } from './itune.service';
import { mockSearchData } from '../../../../server/test/mocks/album-mock';

describe('ItuneService', () => {
  let service: ItuneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ItuneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should getAlbums return the list albums for the given valid artist', () => {
    const artistName = 'rahman';
    service.getAlbums(artistName).subscribe((res) => {
      expect(res).toEqual(mockSearchData);
    });
    const req = httpMock.expectOne('http://localhost:3000/itunes/search/rahman');
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchData);
  });
});
