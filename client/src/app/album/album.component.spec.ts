import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AlbumComponent } from './album.component';
import { ItuneService } from '../services/itune.service';
import { mockSearchData } from '../../../../server/test/mocks/album-mock';

let dummyAlbumList = mockSearchData;
const emptySearchData = {
  resultCount: 0,
  results: []
};

class MockItuneService {
  getAlbums() {
    return of(dummyAlbumList);
  }
}

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let ituneService: ItuneService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AlbumComponent],
      providers: [
        { provide: ItuneService, useClass: MockItuneService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    ituneService = TestBed.inject(ItuneService);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
  it('Show default message on load', () => {
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.default-message'));
    expect(message.nativeElement.textContent.trim()).toEqual('Search itunes by artist name');
  });
  it('searchTerm field validity', () => {
    let errors: any = {};
    let searchTerm = component.form.controls['searchTerm'];
    expect(searchTerm.valid).toBeFalsy();

    // searchTerm field is required
    errors = searchTerm.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set searchTerm to something
    searchTerm.setValue("^^^^");
    errors = searchTerm.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set searchTerm to something correct
    searchTerm.setValue("madonna");
    errors = searchTerm.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });
  it('submitting a form search for the given valid artist name', () => {

    expect(component.form.valid).toBeFalsy();
    component.form.controls['searchTerm'].setValue("rahman");
    expect(component.form.valid).toBeTruthy();

    spyOn(ituneService, 'getAlbums').and.callThrough();
    component.searchAlbums();
    expect(ituneService.getAlbums).toHaveBeenCalled();
    
    expect(component.albums).toEqual(dummyAlbumList.results);
    expect(component.albums.length).toBeGreaterThan(0);
  });
  it('test search for an artist having no albums', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['searchTerm'].setValue("aizin");
    expect(component.form.valid).toBeTruthy();
    spyOn(ituneService, 'getAlbums').and.returnValue(of(emptySearchData));
    component.searchAlbums();
    expect(ituneService.getAlbums).toHaveBeenCalled();
    expect(component.noResult).toBeTruthy();
    expect(component.albums.length).toEqual(0);
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.err-message'));
    expect(message.nativeElement.textContent.trim()).toEqual('No albums found for this artist!');
  });
  it('Check search for invalid artist name', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['searchTerm'].setValue("^^^^");
    expect(component.form.valid).toBeFalsy();
  });
  it('test api search for invalid artist name. Should throw 400', () => {
    const mockError = {
      status: 400,
      error: {
          message: 'Invalid artist name',
      },
  };
    expect(component.form.valid).toBeFalsy();
    component.form.controls['searchTerm'].setValue("^^^^");
    component.form.clearAsyncValidators();
    component.form.controls['searchTerm'].setErrors(null);
    spyOn(ituneService, 'getAlbums').and.returnValue(throwError(mockError));
    component.searchAlbums();
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.err-message'));
    expect(message.nativeElement.textContent.trim()).toEqual('Invalid artist name');
  });
});
