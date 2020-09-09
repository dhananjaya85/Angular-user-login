import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toasterService: ToastrService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName:  ['', Validators.required],
                username:  ['', Validators.required],
                password:  ['', [Validators.required, Validators.minLength(3)]],
                username2: ['', [Validators.compose([Validators.required, this.usernamesAreEqual.bind(this)])]],
                password2: ['', [Validators.compose([Validators.required, this.passwordsAreEqual.bind(this)])]]
            });
    }


    private passwordsAreEqual(fieldControl: FormControl) {
         return fieldControl.value === this.f?.password.value ? null : {
             NotEqual: true
         };
    }

    private usernamesAreEqual(fieldControl: FormControl) {
        return fieldControl.value === this.f?.username.value ? null : {
            NotEqual: true
        };
   }

   // convenience getter for easy access to form fields
   get f() { return this.form?.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.toasterService.success('Account Created Successfully');
                    this.router.navigate(['/account/login']);
                },
                error => {
                    this.loading = false;
                    this.toasterService.error(error);
                });
    }

    signIn () {
        this.router.navigate(['/account/login']);
    }
}
