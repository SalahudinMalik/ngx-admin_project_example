import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor (public auth: NbAuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let status: boolean = true;
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['auth/login']);
        status =  false;
      }
      return status;
  }
}
