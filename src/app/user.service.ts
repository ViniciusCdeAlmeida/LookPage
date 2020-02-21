import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Angular2TokenService } from "angular2-token";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private authTokenService:Angular2TokenService,
    private router:Router
    ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authTokenService.userSignedIn()){
      console.log(this.authTokenService)
      return true;
    }
    else{
      return false;
    }
  }

  hideElement(){
    if(this.authTokenService.userSignedIn()){
      return true;
    }
    else{
      return false;
    }
  }
  
}
