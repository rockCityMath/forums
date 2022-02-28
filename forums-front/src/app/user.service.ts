import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<User[]> {
    const users = of(USERS);
    return users;
  }

  getUser(id: number): Observable<User> {
    const user = USERS.find(h => h.id === id)!;
    return of(user);
  }

  constructor() { }
}
