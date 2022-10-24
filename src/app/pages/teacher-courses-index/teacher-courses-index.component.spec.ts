import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesIndexComponent } from './teacher-courses-index.component';

describe('TeacherCoursesIndexComponent', () => {
  let component: TeacherCoursesIndexComponent;
  let fixture: ComponentFixture<TeacherCoursesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCoursesIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCoursesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
