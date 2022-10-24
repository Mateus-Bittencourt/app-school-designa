import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesIndexComponent } from './pages/courses-index/courses-index.component';
import { CoursesShowComponent } from './pages/courses-show/courses-show.component';
import { LoginComponent } from './pages/login/login.component';
import { TeacherCoursesIndexComponent } from './pages/teacher-courses-index/teacher-courses-index.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CoursesIndexComponent },
  { path: 'cursos/:id', component: CoursesShowComponent },
  { path: ':teacher_id/cursos', component: TeacherCoursesIndexComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
