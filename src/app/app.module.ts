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
import {AdminSidebarContentComponent} from './admin/components/admin-sidebar-content/admin-sidebar-content.component';
import {AdminGraphComponent} from './admin/components/admin-graph/admin-graph.component';
import {SearchComponent} from './shared/components/search/search.component';
import {SalaryTableComponent} from './table/components/salary-table/salary-table.component';
import {CdkMenuModule} from "@angular/cdk/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationHeaderInterceptor} from "./shared/authorization-header.interceptor";
import {AdminModalContentComponent} from './admin/components/admin-modal-content/admin-modal-content.component';

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
        AdminSidebarContentComponent,
        AdminGraphComponent,
        SearchComponent,
        SalaryTableComponent,
        AdminModalContentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        AuthConfigModule,
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        CdkMenuModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthorizationHeaderInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
