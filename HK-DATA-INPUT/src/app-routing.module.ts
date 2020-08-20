import { UserComponent } from './app/components/user/user.component';
import { RegisterComponent } from './app/components/register/register.component';
import { LoginComponent } from './app/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRouteList: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'regiseter',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList)
  ]
})
export class AppRoutingModule {
}
