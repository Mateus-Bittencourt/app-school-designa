import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

interface SuccessModel {}

@Component({
  selector: 'app-courses-show',
  templateUrl: './courses-show.component.html',
  styleUrls: ['./courses-show.component.scss'],
})
export class CoursesShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public id: number = this.route.snapshot.params['id'];
  public course!: Course;
  public path: string = `/courses/${this.id}`;
  public loading: boolean = true;
  paramsSubscription!: Subscription;
  public currentUser!: User;
  public isTeacher: boolean = false;

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.course = await this.apiService.get<Course>(this.path);
    this.loading = false;
    this.paramsSubscription = this.route.params.subscribe(
      async (params: Params) => {
        this.id = params['id'];
        this.path = `/courses/${this.id}`;
        this.course = await this.apiService.get<Course>(this.path);
        this.currentUser = this.authService.currentUser;
        this.isTeacher = this.authService.isTeacher;
      }
    );
  }

  studentSubscribe(): void {
    if (this.authService.isLoggedIn()) {
      this.apiService
        .post<SuccessModel>(`courses/${this.id}/subscriptions`, {})
        .then((_) => {
          this.router.navigateByUrl(
            `${this.currentUser.name.replace(/\s/g, '')}/cursos`
          );
        })
        .catch((err) => {
          alert(err.error.error);
        });
    } else {
      alert('Você precisa estar logado para se inscrever em um curso.');
      this.router.navigateByUrl('/login');
    }
  }
}
