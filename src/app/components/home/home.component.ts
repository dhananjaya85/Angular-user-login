import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}
