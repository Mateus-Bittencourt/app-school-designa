import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  public logged: boolean = false;

  public _currentUser = new BehaviorSubject<User | null>(this.currentUser);

  // Retornar se o usuário está logado
  public isLoggedIn(): boolean {
    return !!localStorage["user"];
  }

  // Retornar qual usuário está logado
  public get currentUser(): User | null {
    try {
      return JSON.parse(localStorage["user"]);
    } catch (error) {
      return null;
    }
  }

  // Realizar o login do usuário
  // armazendo o e-mail informado no localStorage
  public login(user: User): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this._currentUser.next(user);
      if (user.kind === 'teacher') {
        this.router.navigateByUrl(`${user.name.replace(/\s/g, '')}/cursos`);
      }
      this.logged = true;
    }
  }

  // Realiza o logout, limpando o localStorage
  public logout(): void {
    localStorage.clear();
    this.logged = false;
  }


  public currentUserAsObservable(): Observable<User | null> {
    return this._currentUser.asObservable();
  }
}
