import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesShowComponent } from './teacher-courses-show.component';

describe('TeacherCoursesShowComponent', () => {
  let component: TeacherCoursesShowComponent;
  let fixture: ComponentFixture<TeacherCoursesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCoursesShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCoursesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
