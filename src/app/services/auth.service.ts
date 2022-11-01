import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  public logged: boolean = false;

  userLogged = new EventEmitter<User>();
  userLoggedOut = new EventEmitter<User>();

  // Retornar se o usuário está logado
  public isLoggedIn(): boolean {
    return !!localStorage["user"];
  }

    // Retorna se é professor
    public get isTeacher(): boolean {
      return this.currentUser.kind == "teacher"
    }

  // Retornar qual usuário está logado
  public get currentUser(): User {
    return localStorage["user"] ? JSON.parse(localStorage["user"]) : {};
  }

  // Realizar o login do usuário
  // armazendo o e-mail informado no localStorage
  public login(user: User): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // this.router.navigateByUrl('/cursos');

        this.router.navigateByUrl(`${user.name.replace(/\s/g, '')}/cursos`);

      this.logged = true;
    }
  }

  // Realiza o logout, limpando o localStorage
  public logout(): void {
    localStorage.clear();
    this.logged = false;
  }
}
