import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { host } from '../constants';
import { HttpRequestProvider } from '../HttpRequestProvider';

@Injectable()
export class RecordsServiceProvider {

  constructor(private _http: HttpRequestProvider) {
  }

  // model for check the updated user info
  updateRecords(data) {
    let url = host;
    let postData = {
      "email": data.email,
      "password": data.password,
      "name": data.name,
      "city": data.city,
      "state": data.state,
      "zip": data.zip
    };
    
    return this._http.postData(url, postData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

}
