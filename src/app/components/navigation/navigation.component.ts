import { Component, Input, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @Input() flag: boolean;
  constructor() { }

  handleClick() {

  }

  ngAfterViewInit() {
    console.log(this.flag);
  }
}
