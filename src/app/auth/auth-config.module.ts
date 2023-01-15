import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://localhost:5001',
            redirectUrl: window.location.origin + '/signin-oidc',
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
export class AuthConfigModule { }
