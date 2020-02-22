import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

// Service para comunicar com servidor(mock)

@Injectable()
export class StorageService {
  private url: string = 'http://lookpage-teracodeback.herokuapp.com/person';

  constructor(private http: HttpClient,
    private userService: UserService) { }
  
  addUser(user){
    return this.http.post(this.url, user).pipe(map(res => res));
  }

  getUser(userId){
    return this.http.get(this.url + '/' + userId).pipe(map(res => res));
  }
}
