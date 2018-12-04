import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRequestProvider {
    constructor(private _http: HttpClient) { }

    // to register new user
    postData(postUrl, data, headersConfig): Observable<Object> {
        return this._http.post(postUrl, data, headersConfig);
    }

    // fetch all user info
    getData(url, headers): Observable<Object> {
        return this._http.get(url, headers);
    }
}
