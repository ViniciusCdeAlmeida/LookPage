import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Service para comunicar com servidor(mock)

@Injectable()
export class StorageService {
  url = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) { }
  
  addUser(user){
    return this.http.post(this.url, user).pipe(map(res => res));
  }

  getUser(userPwd,userEml){
    return this.http.get(this.url + '?password=' + userPwd + '&email=' + userEml);
  }
}