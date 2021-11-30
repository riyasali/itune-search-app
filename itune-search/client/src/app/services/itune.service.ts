import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItuneService {
  ituneSearchApi: string;
  constructor(private http: HttpClient) {
    this.ituneSearchApi = environment.ituneSearchApiUrl;
  }
  getAlbums(artistName:string): Observable<any> {
    return this.http
      .get<any>(`${this.ituneSearchApi}/${artistName}`);
  }
}
