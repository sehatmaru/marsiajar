import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileGuardService } from './services/guard/profile-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [ProfileGuardService],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'webinar',
        canActivate: [ProfileGuardService],
        loadChildren: () =>
          import('./views/webinar/webinar.module').then((m) => m.WebinarModule)
      },
      {
        path: 'course',
        canActivate: [ProfileGuardService],
        loadChildren: () =>
          import('./views/course/course.module').then((m) => m.CourseModule)
      },
      {
        path: 'invoice',
        canActivate: [ProfileGuardService],
        loadChildren: () =>
          import('./views/invoice/invoice.module').then((m) => m.InvoiceModule)
      },
      {
        path: 'exam',
        canActivate: [ProfileGuardService],
        loadChildren: () =>
          import('./views/exam/exam.module').then((m) => m.ExamModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
