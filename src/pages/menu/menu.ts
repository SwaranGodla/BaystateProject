import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController } from 'ionic-angular';


import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = HomePage;
  title: string = 'Record';
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Logout', component: null }
    ]
  }

  // method for validation user and open corresponding page
  openPage(page) {
    this.title = page.title;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component)
      this.nav.setRoot(page.component);
    else {
      this.navCtrl.setRoot(LoginPage)
      this.navCtrl.popToRoot();
    }
  }

  // to initate the page
  ionViewDidLoad() {
  }

}
