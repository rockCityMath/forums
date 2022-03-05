import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

import { ServerService } from '../shared/services/server-interface.service'
import { PostsService } from '../shared/services/posts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: any = [];
  users: User[] = [];



  constructor(private postService: PostService, private userService: UserService, private serverService: ServerService, private postsService: PostsService) { }

  ngOnInit(): void {
    //this.getPosts();
    this.getUsers();
    this.getMostLiked();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getMostLiked() {
    
    const postsObservable = this.postsService.getMostLiked()
    postsObservable.subscribe((data ) => {
      console.log(data)
      data = Object.values(data)
      this.posts = data
    })
    
    
  }

  getPosts(): void {
    this.postService.getPosts()
      //.subscribe(posts => this.posts = posts);
  }

}
