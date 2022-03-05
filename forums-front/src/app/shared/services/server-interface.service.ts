import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Post } from '../../post'

const baseUrl = 'http://localhost:3232';

@Injectable({
  providedIn: 'root'
})

//Interface with the backend, add JWT to backend calls
export class ServerService {
  private loggedIn = false;
  private token?: string;

  constructor(private http: HttpClient) {}

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token = "";
  }

  //Functions used by auth
  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    //Add token to header
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

    return this.http.request(method, baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  get(route: string, data?: any) {
    console.log("route " + baseUrl + route)
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(baseUrl + route, {
      responseType: 'json',
      headers: header,
      params
    });
  }

  //Functions used for most API calls
  getMostLiked() {

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    const posts = this.http.get(baseUrl + '/api/post/mostLiked', {
      responseType: 'json',
      headers: header
    })

    return posts
  }

  }
