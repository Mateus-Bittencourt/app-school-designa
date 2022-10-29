import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

interface SuccessModel {}

@Component({
  selector: 'app-courses-new',
  templateUrl: './courses-new.component.html',
  styleUrls: ['./courses-new.component.scss']
})
export class CoursesNewComponent implements OnInit {

  private currentUser = this.authService.currentUser;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  public save(): void {
    this.apiService.post<SuccessModel>('courses', this.form.value).then( _ => {
      this.router.navigateByUrl(`${this.currentUser.name.replace(/\s/g, '')}/cursos`);
    }).catch( err => {
      alert(err.error.errors[0]);
    });

  }

}
