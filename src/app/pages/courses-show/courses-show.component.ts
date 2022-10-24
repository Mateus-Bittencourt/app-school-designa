import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses-show',
  templateUrl: './courses-show.component.html',
  styleUrls: ['./courses-show.component.scss']
})
export class CoursesShowComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  public id: number = this.route.snapshot.params['id'];
  public course!: Course;
  public path: string = `/courses/${this.id}`;
  public loading: boolean = true;

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.course = await this.apiService.get<Course>(this.path);
    this.loading = false;
  }

}
