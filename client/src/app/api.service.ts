import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  private baseUrl: string = 'http://localhost:9000';
  constructor(private http: Http) { }

  makeUrl(url, params) {
    let queryString = '';
    if (params) queryString =  '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    return `${this.baseUrl}/${url}/${queryString}`;
  }

  getMatches(params: any) {
    return this.http.get(this.makeUrl('wordmatch', params))
    .map(res => res.json())
    .catch(err => err.json());
  }
}
