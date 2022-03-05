import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Post } from '../../post'

const url = "http://localhost:3232"

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  private token?: string

  getMostLiked() {
    const response = this.http.get('http://localhost:3232/api/post/mostLiked')
    return response

  }


}
