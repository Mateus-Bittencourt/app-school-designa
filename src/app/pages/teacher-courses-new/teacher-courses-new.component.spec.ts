import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesNewComponent } from './teacher-courses-new.component';

describe('TeacherCoursesNewComponent', () => {
  let component: TeacherCoursesNewComponent;
  let fixture: ComponentFixture<TeacherCoursesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCoursesNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCoursesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
