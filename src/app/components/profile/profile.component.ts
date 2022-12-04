import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(protected readonly oidcSecurityService: OidcSecurityService, protected readonly httpClient: HttpClient) { }

  login() {
    this.oidcSecurityService.authorize();
  }

  async query() {
    const token = await this.oidcSecurityService.getAccessToken().toPromise();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }

    const res = await this.httpClient.post('https://localhost:8000/api/roles', {
      title: "АНАЛИТИК"
    }, httpOptions).toPromise().then(console.log).catch(console.warn);
  }

  refreshToken() {
    this.oidcSecurityService.forceRefreshSession().subscribe(console.log);
  }

  ngOnInit(): void {
  }
}
