import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../user.model';

//  Service para guardar o usuario logado

@Injectable()
export class UserService {

    userChanged = new Subject<User[]>();
    private users: User[] = [];
  
    getUser() {
      return this.users;
    }
    
    addUser(user: User) {
        this.users.push(user);
        this.userChanged.next(this.users);
    }

    setUsers(user: User[]) {
      this.users = user;
      this.userChanged.next(this.users);
    }
  }