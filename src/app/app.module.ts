import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphComponent} from './graph/components/graph/graph.component';
import {NgxEchartsModule} from "ngx-echarts";
import {ProfileComponent} from './shared/components/profile/profile.component';
import {CardComponent} from './shared/components/card/card.component';
import {AuthConfigModule} from './auth/auth-config.module';
import {SigninComponent} from './shared/components/signin/signin.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalComponent} from './shared/components/modal/modal.component';
import {UserSidebarComponent} from './graph/components/user-sidebar/user-sidebar.component';
import {AdminSidebarComponent} from './admin/components/admin-sidebar/admin-sidebar.component';
import {AdminGraphComponent} from './admin/components/admin-graph/admin-graph.component';
import { SearchComponent } from './shared/components/search/search.component';
import { SalaryTableComponent } from './table/components/salary-table/salary-table.component';
import { MonthComponent } from './table/components/month/month.component';
import { NameListComponent } from './table/components/name-list/name-list.component';
import { ProjectsComponent } from './shared/components/projects/projects.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';


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
        AdminGraphComponent,
        SearchComponent,
        SalaryTableComponent,
        MonthComponent,
        NameListComponent,
        ProjectsComponent,
        NavbarComponent,
        
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
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
