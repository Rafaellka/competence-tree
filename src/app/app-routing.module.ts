import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GraphComponent} from "./components/graph/graph.component";
import {ProfileComponent} from './components/profile/profile.component';
import {SigninComponent} from './components/signin/signin.component';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGraphComponent} from "./components/admin-graph/admin-graph.component";
import {AdminGuard} from "./guards/admin.guard";
import {UserGuard} from "./guards/user.guard";
import {SearchComponent} from "./components/search/search.component";

const appRoutes: Routes = [
    {
        path: '',
        component: GraphComponent,
        canActivate: [UserGuard]
    },
    {
        path: 'signin-oidc',
        component: SigninComponent
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminGraphComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'user-search',
        component: SearchComponent
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
