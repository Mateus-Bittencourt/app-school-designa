import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CoursesIndexComponent } from './pages/courses-index/courses-index.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesShowComponent } from './pages/courses-show/courses-show.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeacherCoursesIndexComponent } from './pages/teacher-courses-index/teacher-courses-index.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesIndexComponent,
    CourseComponent,
    CoursesShowComponent,
    NavbarComponent,
    TeacherCoursesIndexComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
