import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../@core/data/token-auth.service';
import { UserGaurdService } from './user-gaurd.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private tokenAuthService: TokenAuthService, public userGaurdService: UserGaurdService, public toastr: ToastrService, public router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const str = state.url;
    for (let item of this.userGaurdService.menuItems) {
      if (item.hidden == undefined) {
        return true
      }
      else if (!item.hidden && item.children) {
        for (let child of item.children) {
          if (child.link == str) {
            return true
          }
        }
      } else if (!item.hidden && item.children == undefined) {
        if (item.link == str) {
          return true
        }
      }
    }
    this.toastr.warning('Permission Not allowed "Contact Administrator"')
    this.router.navigateByUrl('pages/welcome');
    return false
  }
}
