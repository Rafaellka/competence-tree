import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { EnterComponent } from './components/enter/enter.component';
import { GraphComponent } from './components/graph/graph.component';
import { NgxEchartsModule } from "ngx-echarts";
import { ProfileComponent } from './components/profile/profile.component';
import { CardComponent } from './components/card/card.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { SigninComponent } from './components/signin/signin.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    EnterComponent,
    GraphComponent,
    ProfileComponent,
    CardComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AuthConfigModule,
    NgxGraphModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
