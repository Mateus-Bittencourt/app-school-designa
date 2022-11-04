import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @Input() course!: Course;
  @Output() onSelectedCourse: EventEmitter<Course> = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {

  }

  selectCourse() {
    this.onSelectedCourse.emit(this.course);

  }
}
