import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesIndexComponent } from './pages/courses-index/courses-index.component';
import { CoursesShowComponent } from './pages/courses-show/courses-show.component';
import { LoginComponent } from './pages/login/login.component';
import { TeacherCoursesIndexComponent } from './pages/teacher-courses-index/teacher-courses-index.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TeacherCoursesShowComponent } from './pages/teacher-courses-show/teacher-courses-show.component';
import { TeacherCoursesNewComponent } from './pages/teacher-courses-new/teacher-courses-new.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'cursos',
    component: CoursesIndexComponent,
    children: [{ path: ':id', component: CoursesShowComponent }],
  },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  // { path: 'cursos/:id', component: CoursesShowComponent },
  {
    path: ':teacher',
    canActivate: [AuthGuard],
    children: [
      { path: 'cursos', component: TeacherCoursesIndexComponent },
      { path: 'cursos/novo', component: TeacherCoursesNewComponent },
      { path: 'cursos/:id', component: TeacherCoursesShowComponent },
    ],
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
