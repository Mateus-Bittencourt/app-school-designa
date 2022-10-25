import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): boolean {
    let hasAccess: boolean = this.authService.isLoggedIn();
    if (hasAccess) {
      return true;
    } else {
      alert('Você não tem permissão');
      return false;
    }
  }
}
