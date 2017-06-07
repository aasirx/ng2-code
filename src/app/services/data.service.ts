import { Injectable } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import { siteType } from '../dropdown-site/site-types'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    private api_url = 'http://localhost:3000/sites';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getSites(): Promise<siteType[]> {
        return this.http.get(this.api_url)
        .toPromise()
        .then(res => res.json().data as siteType[])
    }
    getSitePrev(keywork:string, url: string, page: number, pageSize: number){
        var cond={
            cond:keywork,
            queryNo:page,
            queryPerNum:pageSize
        }
        return this.postHttp(url, JSON.stringify(cond));
    }
    private postHttp(url: string, conds: any) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .get(url,{headers: headers});
    }
}
