import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public isRegister: boolean = true;
  public isEnter: boolean = false;


  constructor() {

  }

  ngOnInit(): void {

  }

}
