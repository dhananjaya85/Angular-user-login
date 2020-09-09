import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toasterService: ToastrService
    ) { }

    isValidUser = false;
    invalidAuthentication = false;
    buttonText = 'Next';
    userSubmitted = false;
    invalidUsername = false;

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSearchChange(searchValue: string): void {
        if (searchValue) {
            this.buttonText = 'Log In';
        }   else {
            this.buttonText = 'Next';
        }
    }

    onSubmit() {
        this.userSubmitted = true;
        if (this.f.username.value !== '' && this.f.password.value === '') {
            this.validateUsername();
        }

        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('form invalid');
            return;
        }

        this.buttonText = 'Verifying';
        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.invalidAuthentication = true;
                    // this.toasterService.error('Invalid username or password');
                    this.loading = false;
                    this.buttonText = 'Log In';
                });
    }

    validateUsername() {
        this.buttonText = 'Verifying';
        this.loading = true;
        this.accountService.validateUser(this.f.username.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.isValidUser = true;
                    this.buttonText = 'Next';
                    this.loading = false;
                    this.user = data;
                },
                error => {
                    this.isValidUser = false;
                    this.invalidUsername = true;
                    this.buttonText = 'Next';
                    this.loading = false;
                });
    }

    logIn () {
        this.router.navigate(['/account/login']);
    }
}
