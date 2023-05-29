import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {OidcSecurityService} from "angular-auth-oidc-client";
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: IUser;
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router, private oidc: OidcSecurityService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAdmin = this.userService.getUser().isAdmin;
  }

  goToMyProfile() { 
    if (this.user) {
      this.router.navigate(['profile', this.user.id]);
    } else {
      this.oidc.authorize();
    }
  }

}
