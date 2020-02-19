import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Service para comunicar com servidor(mock)

@Injectable()
export class StorageService {
  private url: string = 'http://localhost:3000/api/v1/person';

  constructor(private http: HttpClient) { }
  
  addUser(user){
    return this.http.post(this.url, user).pipe(map(res => res));
  }

  getUser(userId){
    return this.http.get(this.url, userId).pipe(map(res => res));
  }
}