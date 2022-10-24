import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesShowComponent } from './courses-show.component';

describe('CoursesShowComponent', () => {
  let component: CoursesShowComponent;
  let fixture: ComponentFixture<CoursesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
