import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = UserPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

      Splashscreen.hide();
      StatusBar.styleDefault();

    });
  }
}
