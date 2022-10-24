import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.scss'],
})
export class CoursesIndexComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public courses!: Course[];
  public loading: boolean = true;

  ngOnInit(): void {
    this.loadCourses();
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
}
