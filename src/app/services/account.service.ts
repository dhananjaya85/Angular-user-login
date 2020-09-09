import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private userSubject: BehaviorSubject<User>;
	public user: Observable<User>;

  constructor(
        private http: HttpClient,
		private router: Router
  ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
	    this.user = this.userSubject.asObservable();
    }

	public get userValue(): User {
		return this.userSubject.value;
	}

	login(username, password) {
		return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
			.pipe(map(user => {
				// tslint:disable-next-line: indent
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));
				this.userSubject.next(user);
				return user;
			}));
	}

	register(user: User) {
		return this.http.post(`${environment.apiUrl}/users/register`, user);
	}

	logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('user');
		this.userSubject.next(null);
		this.router.navigate(['/account/login']);
	}

	validateUser(username) {
		//console.log('acct');
		return this.http.post<User>(`${environment.apiUrl}/users/validateuser`, { username })
			.pipe(map(user => {
				// tslint:disable-next-line: indent
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				//localStorage.setItem('user', JSON.stringify(user));
				//this.userSubject.next(user);
				return user;
			}));
	}
}
