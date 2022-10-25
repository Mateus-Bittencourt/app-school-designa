import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public currentUser!: User;

  constructor(
    private authService: AuthService,
    private router: Router,

  )
   {
   }

  ngOnInit(): void {
    this.authService.userLogged.subscribe(
      (user: User) => {
        console.log(user);
        this.userLogged = user;
        this.logged = true;
      }
    );
    console.log(this.authService.currentUser)
    this.currentUser = this.authService.currentUser;
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/cursos']);
    this.logged = false;
  }

  myCourses(): void {
    // console.log(`${this.currentUser.name.replace(/\s/g, '')}/cursos`);
    this.router.navigateByUrl(`${this.currentUser.name.replace(/\s/g, '')}/cursos`);
  }
}
