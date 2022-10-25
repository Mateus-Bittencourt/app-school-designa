import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

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
  paramsSubscription!: Subscription;

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.course = await this.apiService.get<Course>(this.path);
    this.loading = false;
    this.paramsSubscription = this.route.params
    .subscribe(
      async (params: Params)  => {
        this.id = params['id'];
        this.path = `/courses/${this.id}`;
        this.course = await this.apiService.get<Course>(this.path);
      }
    );
  }

}
