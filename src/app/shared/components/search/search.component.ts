import {Component, OnInit} from '@angular/core';
import {SearchUserService} from "../../services/search-user.service";
import {Router} from "@angular/router";
import {IUser} from "../../interfaces/IUser";
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchModel = '';
    users: IUser[];
    modal: boolean = false;
    createUserForm = this.fb.group({
        surName: '',
        name: '',
        patronymic: '',
        email: ''

    });

    constructor(private searchUsersService: SearchUserService, private router: Router, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.searchUser();

    }

    // Метод для просмотра данных в консоли (нужно удалить)
    onSubmit(): void {
        console.log(this.createUserForm.value);
        this.createUserForm.valueChanges.subscribe((v) => {
            console.log(v)
        })
    }

    showModal() {
        this.modal = true;
    }

    goToUserProfile(userId: string) {
        this.router.navigate([`/profile/${userId}`])
    }

    searchUser() {
        this.searchUsersService.searchUsers(this.searchModel).subscribe(users => {
            this.users = [...users.items]
            console.log(this.users)
        })
    }
}
