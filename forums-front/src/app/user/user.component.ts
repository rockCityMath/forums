import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Post } from '../post';

import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user?: User;

  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {

  }

/*
  getUsers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser()
      .subscribe(users => this.users = users);
  }*/


}
