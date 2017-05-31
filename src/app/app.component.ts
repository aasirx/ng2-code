import { Component, Input, OnInit } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from './services/data.service';
import * as jQuery from 'jquery';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { siteType } from './dropdown-site/site-types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: siteType[] = [
        {
            sitename:"Luwafu_DIR_Muswa",
            region:"EMS=HUAWEI_TRANS@NEID=3145888",
            location:"123",
            description:"desc1"
        },
        {
            sitename:"Luwafu_DIR_buswe",
            region:"EMS=HUAWEI_TRANS@NEID=3145889",
            location:"1234",
            description:"desc3"
        },
        {
            sitename:"Luwafu_DIR_euswe",
            region:"EMS=HUAWEI_TRANS@NEID=3145890",
            location:"12345",
            description:"desc2"
        }
    ]
  public selectName: string = "NE";
  optionsModel: number[];
  onTextChanges(value) {
    // console.log("value:"+value)
  }
  

  private countries: IMultiSelectOption[] = [
    { id: 1, name: 'Sweden' },
    { id: 2, name: 'Norway' },
    { id: 3, name: 'Denmark' },
    { id: 4, name: 'Finland' },
  ];

  private texts: IMultiSelectTexts = {
    defaultTitle: 'Select countries'
  };

  private selectSettings: IMultiSelectSettings = {
    checkedStyle: 'glyphicon',
    showCheckAll: true,
    showUncheckAll: true,
  };

  private selectSettings2: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    // checkedStyle: 'glyphicon',

  };
  onChange() {
        console.log(this.optionsModel);
    }

constructor(private service: DataService) { }
  ngOnInit() {
    this.service.getSites()
        .then(res => {
          this.data = res;
        })

  }



}
