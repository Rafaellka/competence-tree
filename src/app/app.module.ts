import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphComponent} from './components/graph/graph.component';
import {NgxEchartsModule} from "ngx-echarts";
import {ProfileComponent} from './components/profile/profile.component';
import {CardComponent} from './components/card/card.component';
import {AuthConfigModule} from './auth/auth-config.module';
import {SigninComponent} from './components/signin/signin.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {ModalComponent} from './components/modal/modal.component';
import {UserSidebarComponent} from './components/user-sidebar/user-sidebar.component';
import {AdminSidebarComponent} from './components/admin-sidebar/admin-sidebar.component';
import {AdminGraphComponent} from './components/admin-graph/admin-graph.component';

@NgModule({
    declarations: [
        AppComponent,
        GraphComponent,
        ProfileComponent,
        CardComponent,
        SigninComponent,
        SidebarComponent,
        ModalComponent,
        UserSidebarComponent,
        AdminSidebarComponent,
        AdminGraphComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        AuthConfigModule,
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
