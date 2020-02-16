import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../user.model';

@Injectable()
export class UserService {

    userChanged = new Subject<User[]>();
    private users: User[] = [];
  
    getUser() {
      return this.users;
    }
    
    addUser(user: User) {
        this.users.push(user);
        this.userChanged.next(this.users.slice());
    }

    setUsers(user: User[]) {
      this.users = user;
      this.userChanged.next(this.users);
    }
  }