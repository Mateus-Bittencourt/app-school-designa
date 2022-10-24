import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teacher-courses-index',
  templateUrl: './teacher-courses-index.component.html',
  styleUrls: ['./teacher-courses-index.component.scss']
})
export class TeacherCoursesIndexComponent implements OnInit {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  public courses!: Course[];
  public loading: boolean = true;
  public currentUser!: User;

  ngOnInit(): void {
    this.loadCourses();
    this.currentUser = this.authService.currentUser;
  }

  public loadCourses(): void {
    this.loading = true;
    this.apiService
      .get<Course[]>('teacher_courses')
      .then((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      });
  }
}
