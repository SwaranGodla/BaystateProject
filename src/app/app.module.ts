import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import { HeaderComponent } from '../components/header/header';
import { AuthService } from '../providers/auth-service/auth-service';
import { RecordFormPage } from '../pages/record-form/record-form';
import { RecordsServiceProvider } from '../providers/recordsService/recordsService';
import {HttpClientModule} from '@angular/common/http';
import { HttpRequestProvider } from '../providers/HttpRequestProvider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    HeaderComponent,
    RecordFormPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    RecordFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    RecordsServiceProvider,
    HttpRequestProvider
  ]
})
export class AppModule { }
