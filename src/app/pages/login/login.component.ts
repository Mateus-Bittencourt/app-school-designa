import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl('mateus@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('secret', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
  }


  public login(): void {
    if(this.formGroup.valid) {
      this.apiService.post<User>('sessions',
        {
          user: this.formGroup.value
        }
      ).then( data => {
        // console.log(data);
        this.authService.login(data)
      }).catch( error => {
        console.log(error);
      })
    } else {
      alert('preencha todos os campos')
    }
  }

}
