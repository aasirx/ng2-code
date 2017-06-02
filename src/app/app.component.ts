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
