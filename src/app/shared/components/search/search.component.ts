import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces";
import {SearchUserService} from "../../services/search-user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchModel = '';
    users: IUser[];

    constructor(private searchUsersService: SearchUserService, private router: Router) {
    }

    ngOnInit() {
        this.searchUser();
    }

    goToUserProfile(userId: string) {
        this.router.navigate([`/profile/${userId}`])
    }

    searchUser() {
        this.searchUsersService.searchUsers(this.searchModel).subscribe(users => {
            this.users = [...users.items]
        })
    }
}
