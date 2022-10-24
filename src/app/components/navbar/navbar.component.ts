import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logged: boolean = false;

  constructor(
    private authService: AuthService
  )
   { }

  ngOnInit(): void {
      // this.logged = this.authService.isLoggedIn();
      // this.authService.currentUser.subscribe( user => {
      //   this.logged = user !== null;
      // }
  }

}
