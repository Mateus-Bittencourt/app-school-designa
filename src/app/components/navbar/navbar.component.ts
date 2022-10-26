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

  public logged: boolean = false;

  public userLogged!: User;
  public currentUser$!: Observable<User | null>

  constructor(
    private authService: AuthService,
    private router: Router,

  )
   {
   }

  ngOnInit(): void {
    this.logged = this.authService.isLoggedIn();
    console.log(this.authService.currentUser)
    this.currentUser$ = this.authService.currentUserAsObservable();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/cursos']);
    this.logged = false;
  }

  // myCourses(): void {
  //   // console.log(`${this.currentUser.name.replace(/\s/g, '')}/cursos`);
  //   this.router.navigateByUrl(`${this.currentUser.name.replace(/\s/g, '')}/cursos`);
  // }

  // newCourses(): void {
  //   this.router.navigateByUrl(`${this.currentUser.name.replace(/\s/g, '')}/cursos/novo`);
  // }
}
