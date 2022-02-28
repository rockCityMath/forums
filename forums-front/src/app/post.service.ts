import { Injectable } from '@angular/core';
import { Post } from './post';
import { POSTS } from './mock-posts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }

  getPost(id: number): Observable<Post> {
    const post = POSTS.find(h => h.id ===id)!;
    return of(post);
  }

  constructor() { }
}
