import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { states } from './../../providers/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RecordsServiceProvider } from '../../providers/recordsService/recordsService';

/**
 * Generated class for the RecordFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record-form',
  templateUrl: 'record-form.html',
})
export class RecordFormPage {
  title = "User Information";
  stateOptions: any;
  record: any;
  index;

  recordForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loader: LoadingController, public viewCtrl: ViewController, private _recordsServ: RecordsServiceProvider) {
    //adding the states data from constant data model
    this.stateOptions = states;

    if (!navParams.get('recordValue')) {
      this.record = {
        name: "",
        email: "",
        city: "",
        state: "",
        zip: "",
        password: "password"
      };
    }
    else {
      this.record = navParams.get('recordValue');
      this.index = navParams.get('index');
    }
  }
 // validator pattern 
  ngOnInit() {
    let emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.recordForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required,Validators.maxLength(6), Validators.pattern('[0-9]*')])
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordFormPage');
  }

  // functiion for add or update new record in DB
  addOrUpdateRecord() {
    let loading = this.loader.create({});
    loading.present();
    let arr;
    this.storage.get('records').then(val => {
      arr = val;
      if (this.index != undefined) {
        arr[this.index] = this.record;
      }
      else {
        arr.push(this.record);
      }
      this.storage.set('records', arr);

      // API Call to update the records on server
      console.log(this.record);
      this._recordsServ.updateRecords(this.record).subscribe(success => {
        console.log(success);
      }, error => {
        console.log(error);
      })

      loading.dismiss();
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 2));
    });


  }

}
