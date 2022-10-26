import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Lecture } from 'src/app/models/lecture';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teacher-courses-show',
  templateUrl: './teacher-courses-show.component.html',
  styleUrls: ['./teacher-courses-show.component.scss']
})
export class TeacherCoursesShowComponent implements OnInit {

  public id: number = this.route.snapshot.params['id'];
  public course!: Course;
  public path_coures: string = `/courses/${this.id}`;
  public lecture!: Lecture;

  public lectures: Lecture[] = []

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }


  public async ngOnInit(): Promise<void> {
    // this.loading = true;
    this.course = await this.apiService.get<Course>(this.path_coures);
    // this.loading = false;
    this.lectures = await this.apiService.get<Lecture[]>(`/courses/${this.id}/lectures`);
  }

  loadLecture(lecture: Lecture) {
    this.lecture = lecture;
    this.modal?.nativeElement.showModal();
  }


  closeModal() {
    this.modal?.nativeElement.close();
  }
}
