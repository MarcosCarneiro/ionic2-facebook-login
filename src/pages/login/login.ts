import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  FB_APP_ID: number = 1811578909094045;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){

    let permissions = new Array<string>();
    let nav = this.navCtrl;
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.pop();
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });

  }

}
