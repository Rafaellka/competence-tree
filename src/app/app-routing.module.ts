import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GraphComponent} from "./graph/components/graph/graph.component";
import {ProfileComponent} from './shared/components/profile/profile.component';
import {SigninComponent} from './shared/components/signin/signin.component';
import {AuthGuard} from "./auth/guards/auth.guard";
import {AdminGraphComponent} from "./admin/components/admin-graph/admin-graph.component";
import {AdminGuard} from "./admin/guards/admin.guard";
import {UserGuard} from "./shared/user.guard";
import {SearchComponent} from "./shared/components/search/search.component";

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
