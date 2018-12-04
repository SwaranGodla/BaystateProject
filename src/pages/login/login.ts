import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  loading: Loading;

  // static login Credentials
  loginCredentials = { email: 'test@baystate.com', password: 'password' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  // login method and validation
  public login() {
    this.showLoading();
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (this.loginCredentials.email == undefined || this.loginCredentials.email == null || this.loginCredentials.email == "") {
      this.showError("Enter email address");
    } else if(reg.test(this.loginCredentials.email) == false){
      this.showError("Enter valid email address");
    }else if (this.loginCredentials.password == undefined || this.loginCredentials.password == null || this.loginCredentials.password == "") {
      this.showError("Enter password");
    } else {
      this.auth.login(this.loginCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot(MenuPage);
        } else {
          this.showError("Enter valid Email or password.");
        }
      },
        error => {
          this.showError(error);
        });
    }
  }

  // for show the spinner
  showLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  // method for show error message
  showError(text) {
    console.log(text);
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}