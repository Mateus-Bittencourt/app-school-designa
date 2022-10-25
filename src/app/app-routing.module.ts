import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesIndexComponent } from './pages/courses-index/courses-index.component';
import { CoursesShowComponent } from './pages/courses-show/courses-show.component';
import { LoginComponent } from './pages/login/login.component';
import { TeacherCoursesIndexComponent } from './pages/teacher-courses-index/teacher-courses-index.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CoursesIndexComponent, children: [
    { path: ':id', component: CoursesShowComponent }
  ]},
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  // { path: 'cursos/:id', component: CoursesShowComponent },
  { path: ':teacher_id/cursos', component: TeacherCoursesIndexComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
