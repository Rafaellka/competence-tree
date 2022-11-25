import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationComponent} from './components/authorization/authorization.component';
import {EnterComponent} from './components/enter/enter.component';
import {RegisterComponent} from './components/register/register.component';
import {GraphComponent} from './components/graph/graph.component';
import {NgxEchartsModule} from "ngx-echarts";
import { ProfileComponent } from './components/profile/profile.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    EnterComponent,
    RegisterComponent,
    GraphComponent,
    ProfileComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
