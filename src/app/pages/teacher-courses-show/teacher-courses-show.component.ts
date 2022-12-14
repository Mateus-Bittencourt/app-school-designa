import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Lecture } from 'src/app/models/lecture';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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
  public video_url: SafeUrl = '';
  public isTeacher: boolean = false;

  public lectures: Lecture[] = []

  public formLecture: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    video_url: new FormControl(''),
    content: new FormControl('', [Validators.required])
  });



  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>
  @ViewChild('modal2') modal2!: ElementRef<HTMLDialogElement>

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) { }


  public async ngOnInit(): Promise<void> {
    this.isTeacher = this.authService.isTeacher;
    // this.loading = true;
    this.course = await this.apiService.get<Course>(this.path_coures);
    // this.loading = false;
    this.lectures = await this.apiService.get<Lecture[]>(`/courses/${this.id}/lectures`);
  }

  async loadLecture(lecture: Lecture) {
    this.lecture = await this.apiService.get<Lecture>(`/courses/${this.id}/lectures/${lecture.id}`);
    if (this.lecture.video_url) {
      this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.lecture.video_url.replace('watch?v=', 'embed/'));
    }
    this.modal?.nativeElement.showModal();
  }


  closeModal() {
    this.modal?.nativeElement.close();

  }

  closeModal2() {
    this.modal2?.nativeElement.close();
  }

  newLecture() {
    this.modal2?.nativeElement.showModal();
  }

  saveLecture() {
    this.apiService.post<Lecture>(`/courses/${this.id}/lectures`, this.formLecture.value).then(lecture => {
      this.lectures.push(lecture);
      this.modal2?.nativeElement.close();
    }).catch(err => {
      alert(err.error.error);
    });
  }



}
