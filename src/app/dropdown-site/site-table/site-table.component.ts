import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { TranslateService } from "ng2-translate";
import { Http } from "@angular/http";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-site-table',
  templateUrl: './site-table.component.html',
  styleUrls: ['./site-table.component.css']
})
export class SiteTableComponent implements OnInit {
  conds: string;
  url: string;
  refreshSubject = new Subject<any>();
  refreshObservable: Observable<any>;
  settings;
  defaultLang = this.translate.getDefaultLang();


  @Input()
  set sourceConds(sourceConds: any) {
    this.conds = sourceConds;
    this.refreshSubject.next('refresh');
  }
  I18n = {
    zh_CN: {
      "sitename": "站点名称",
      "region": "地域",
      "location": "位置",
      "description": "描述"
    },
    en_US: {
      "sitename": "Site Name",
      "region": "Region",
      "location": "Location",
      "description": "Descsription"

    }
  };
  @Input()
  set setData(data: string) {
    var lan = this.defaultLang == "en" ? "_en_US" : "_zh_CN";
    var i18n = this.I18n[this.defaultLang == "zh" ? "zh_CN" : "en_US"];
    this.settings = {
      hideHeader: false,
      hideSubHeader: true,
      columns: {
        sitename: {
          title: i18n["sitename"]
        },
        region: {
          title: i18n["region"]
        },
        location: {
          title: i18n["location"]
        },
        description: {
          title: i18n["descsription"]
        },
      },
      pager: {
        display: true,
        perPage: 5,
        pageStep: 3
      },
      attr: {
        id: '',
        class: ''
      },
      showDetailControl: false,
      customGetdataFunction: this.customLoadData,
      source: 'server',
      showRowIndex: false,
      showCheckBox: true,
      prepareDataOnLocal: false,
      language: this.defaultLang
    };
    this.url = "http://localhost:3000/sites";
  }
  constructor(private service: DataService, private http: Http, private translate: TranslateService) {
    this.refreshObservable = this.refreshSubject.asObservable();
  }

  ngOnInit() {
  }


  customLoadData = (filterConf: Array<any>, sortConf: Array<any>, pagingConf: Object, http: Http) => {
    let sa = this.url;
    let returnPromise = this.service.getSitePrev(this.conds, this.url, pagingConf['page'] - 1, pagingConf['perPage'])
      .toPromise()
      .then(res => {
        let data = res.json().data;
        let total = res.json().total;
        return {
          data: data,
          total: total
        }
      })
    // .map(res => {
    // var notlan = this.defaultLang == "zh" ? "_en_US" : "_zh_CN";
    // var lan = this.defaultLang == "en" ? "_en_US" : "_zh_CN";
    // let dataArray: Array<any> = [];
    // })

    return returnPromise;
  }
}
