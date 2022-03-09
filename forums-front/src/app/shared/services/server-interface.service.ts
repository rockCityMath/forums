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

  //Set on setLoggedIn()
  private loggedIn = false;
  private token?: string;

  constructor(private http: HttpClient) {}

  //Call externally to set login state and token
  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token = "";
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

  login(loginData?:any ) {

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + '/auth/login', {
      body: loginData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  register(userData?: any) {

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request("POST", baseUrl + '/auth/register', {
      body: userData,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  }