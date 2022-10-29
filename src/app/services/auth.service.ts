import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  public _currentUser = new BehaviorSubject<User>(this.currentUser);

  // Retornar se o usuário está logado
  public isLoggedIn(): boolean {
    try {
      return !!localStorage["user"];
    } catch {
      return false
    }
  }

  // Retornar qual usuário está logado
  public get currentUser(): User {
    return localStorage["user"] ? JSON.parse(localStorage["user"]) : {};
  }

  public currentUserAsObservable(): Observable<User> {
    return this._currentUser.asObservable();
  }

  // Retorna se é professor
  public get isTeacher(): boolean {
    return this.currentUser.kind == "teacher"
  }

  // Realizar o login do usuário
  // armazendo o e-mail informado no localStorage
  public login(user: User): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.kind === 'teacher') {
        this.router.navigateByUrl(`${user.name.replace(/\s/g, '')}/cursos`);
      } else {
        this.router.navigateByUrl('/cursos');
      }

      this._currentUser.next(user);
    }
  }

  // Realiza o logout, limpando o localStorage
  public logout(): void {
    localStorage.clear();
  }

}
