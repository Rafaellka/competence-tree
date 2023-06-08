import {NgModule} from '@angular/core';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: environment.identity,
            redirectUrl: location.origin + '/#/signin-oidc',
            postLogoutRedirectUri: window.location.origin + '',
            clientId: 'skill-system-web',
            scope: 'openid profile roles SkillSystem.WebApi',
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: window.location.origin + '/refresh-token',
            logLevel: LogLevel.Debug,
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule {
}
