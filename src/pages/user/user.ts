import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      this.navCtrl.push(LoginPage);
    });
  }

  doFbLogout(){
    Facebook.logout()
    .then(function(response) {
      NativeStorage.remove('user');
      this.navCtrl.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }

}
