import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()

export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>{
    return this.loginService.isLoggedIn
      .pipe(take(1))
      .pipe(map((isLoggedIn:boolean)=>{
        if(!isLoggedIn){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }))
  }

}
