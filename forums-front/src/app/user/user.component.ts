import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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
