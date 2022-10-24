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

  constructor(
    private authService: AuthService,
    private router: Router
  )
   { }

  ngOnInit(): void {
    this.authService.userLogged.subscribe(
      (user: User) => {
        console.log(user);
        this.userLogged = user;
        this.logged = true;
      }
    );
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.logged = false;
  }
}
