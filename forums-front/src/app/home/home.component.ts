import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

}
