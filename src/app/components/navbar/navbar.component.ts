import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userLogged!: User;
  public currentUser$!: Observable<User | null>
  public username: string = ''

  constructor(
    public authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUserAsObservable();
    this.username = this.authService.currentUser.name.replace(/\s/g, '')
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/cursos']);
  }

  myCourses(): void {
    if (this.authService.isLoggedIn()) this.router.navigateByUrl(`${this.username}/cursos`);
  }

  newCourses(): void {
    if (this.authService.isTeacher) {
      this.router.navigateByUrl(`${this.username}/cursos/novo`)
      return
    }

    this.router.navigateByUrl('')
  }
}
