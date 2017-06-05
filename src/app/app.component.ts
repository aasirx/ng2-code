import { Component, Input, OnInit } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from './services/data.service';
import * as jQuery from 'jquery';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './dropdown/types';
import { siteType } from './dropdown-site/site-types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: siteType[] = [];
  public selectName: string = "NE";
  optionsModel: number[];
  optionsModel2: string[];
  onTextChanges(value) {
    // console.log("value:"+value)
  }

  // *******************
  vipLevelModel:string[];
  statusModel:string[]

  //******************* */

  private vipLevelData:IMultiSelectOption[] = [
    {value: '1', name: 'P1'},
    {value: '2', name: 'P2'},
    {value: '3', name: 'P3'},
    {value: '4', name: 'P4'}
  ]
  private statusData: IMultiSelectOption[] = [
    {value: '2', name: '2G'},
    {value: '3', name: '3G'},
    {value: '4', name: '4G'},
    {value: '5', name: '5G'},
  ]
  private vipLeveltexts: IMultiSelectTexts = {
    defaultTitle: 'VIP Level',
    buttonPrefix: 'VIP Level',
    searchPlaceholder: 'Find VIP Level'
  }
  private vipLevelSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    showCheckAll: false,
    showUncheckAll: false,
    enableSearch:true
  };
  onChangeVipLevel() {
    console.log(this.vipLevelModel);
  }


  // *******************
  private countries: IMultiSelectOption[] = [
    { value: 1, name: 'Sweden' },
    { value: 2, name: 'Norway' },
    { value: 3, name: 'Denmark' },
    { value: 4, name: 'Finland' },
  ];

  private texts: IMultiSelectTexts = {
    defaultTitle: 'Select NE',
    buttonPrefix: 'NE',
    searchPlaceholder: 'Find NE'
  };
  private texts2: IMultiSelectTexts = {
    defaultTitle: 'Select Site',
    buttonPrefix: 'Site',
    searchPlaceholder: 'Find Site'
  };

  private selectSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    showCheckAll: false,
    showUncheckAll: false,
  };

  private selectSettings2: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    // checkedStyle: 'glyphicon',

  };
  onChange() {
    console.log(this.optionsModel);
  }
  onChange2() {
    console.log(this.optionsModel2);
  }

  constructor(private service: DataService) { }
  ngOnInit() {
    this.service.getSites()
      .then(res => {
        this.data = res;
      })

  }



}
