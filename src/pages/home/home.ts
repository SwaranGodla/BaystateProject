import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { records } from '../../providers/records';
import { RecordFormPage } from '../record-form/record-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title="Home"
  username:string;
  data:any;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public loadCtrl:LoadingController) {
  }

  // fetch data from db and loads on ion listview.
  ionViewDidLoad(){
    let loading = this.loadCtrl.create({
    });
    loading.present();
    this.storage.get('records').then(val=>{
      this.data=val;
      if(this.data){
        loading.dismiss();
      }
      else{
        this.storage.set('records',records);
        setTimeout(()=>{
          this.storage.get('records').then(val=>{
            this.data=val;
            loading.dismiss();
          })
        },1000)
      }
    })
  }  

  // clear the database
  // clean(){
  //   this.storage.clear();
  //   console.log(this.storage);
  // }

  //used for edit the user data 
  edit(item,i){
    this.navCtrl.push(RecordFormPage,{recordValue:item,index:i});
  }

  // adds new record into database.
  addNew(){
    this.navCtrl.push(RecordFormPage);
  }

  // initate page logic
  ionViewDidEnter(){
    let loading = this.loadCtrl.create({
    });
    loading.present();
        this.storage.get('records').then(val=>{
      this.data=val;
      loading.dismiss();
    })
  } 
}
