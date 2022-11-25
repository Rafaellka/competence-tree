import {RegisterComponent} from './components/register/register.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationComponent} from './components/authorization/authorization.component';
import {EnterComponent} from './components/enter/enter.component';
import {GraphComponent} from "./components/graph/graph.component";
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: GraphComponent
  },
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
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
