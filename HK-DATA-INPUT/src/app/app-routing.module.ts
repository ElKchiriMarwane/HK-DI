import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './components/connect/connect.component';

const routes: Routes = [
  { path: '', redirectTo: 'connect', pathMatch: 'full'},
  { path: 'connect', component: ConnectComponent },
  { path: 'user', component: UserComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
