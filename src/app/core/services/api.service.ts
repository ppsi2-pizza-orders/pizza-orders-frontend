import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PATH_PARAMS} from '../const';

const BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) {}

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .get(BASE_URL + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, body)
      .pipe(catchError(this.formatErrors));
  }

  public path(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, body, PATH_PARAMS)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, body)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(BASE_URL + path)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any): Observable<any> {
    return throwError(error.error.messages[0]);
  }
}
