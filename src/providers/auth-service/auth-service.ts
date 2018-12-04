import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
 
  // validate username and password entered by user
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password == "password" && credentials.email == "test@baystate.com");
        // this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  // validation check
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  // to get user information.
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  // for logout from the app.
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
