import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../@core/data/token-auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private tokenAuthService:TokenAuthService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.tokenAuthService.userRole == 1)
          return true;
      else
        return false;
  }
}
