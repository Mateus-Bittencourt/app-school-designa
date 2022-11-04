import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

interface SuccessModel {};

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.scss'],
})
export class CoursesIndexComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  public courses!: Course[];
  public loading: boolean = true;
  public selectedCourse?: Course | null;
  public currentUser!: User;
  public isTeacher: boolean = false;

  ngOnInit(): void {
    this.loadCourses();
    this.currentUser = this.authService.currentUser;
    this.isTeacher = this.authService.isTeacher;
  }

  public loadCourses(): void {
    this.loading = true;
    this.apiService
      .get<Course[]>('courses')
      .then((courses: Course[]) => {
        this.courses = courses;
        this.loading = false;
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      });
  }

  async onSelectedCourse(course: Course) {
    this.selectedCourse = await this.apiService.get<Course>(`/courses/${course.id}`);

  }

  studentSubscribe(): void {
    if (this.authService.isLoggedIn()) {
      this.apiService
        .post<SuccessModel>(`courses/${this.selectedCourse?.id}/subscriptions`, {})
        .then((_) => {
          this.router.navigateByUrl(
            `${this.currentUser.name.replace(/\s/g, '')}/cursos`
          );
        })
        .catch((err) => {
          alert('Você já está inscrito neste curso');
          console.log(err);
        });
    } else {
      alert('Você precisa estar logado para se inscrever em um curso.');
      this.router.navigateByUrl('/login');
    }
  }
}
