import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { EnterComponent } from './components/enter/enter.component';

const routes: Routes = [
  {
    path: 'authorization', 
    component: AuthorizationComponent,
    children: [{
      path: 'enter',
      component: EnterComponent
    }, {
      path: 'register',
      component: RegisterComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
