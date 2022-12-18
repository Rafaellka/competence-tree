import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { GraphComponent } from './components/graph/graph.component';
import { NgxEchartsModule } from "ngx-echarts";
import { ProfileComponent } from './components/profile/profile.component';
import { CardComponent } from './components/card/card.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    GraphComponent,
    ProfileComponent,
    CardComponent,
    SigninComponent,
    NavigationComponent,
    ModalComponent
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
