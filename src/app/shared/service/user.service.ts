import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../user.model';

//  Service para guardar o usuario logado

@Injectable()
export class UserService {

    userChanged = new Subject<User[]>();
    private users: User[] = [];
  
    getUser() {
      console.log("getUsers")
      console.log(this.users)
      return this.users;
    }
    
    addUser(user: User) {
        this.users.push(user);
        this.userChanged.next(this.users.slice());
    }

    setUsers(user: User[]) {
      console.log(user)
      this.users = user;
      console.log(this.users)
      this.userChanged.next(this.users.slice());
    }
  }