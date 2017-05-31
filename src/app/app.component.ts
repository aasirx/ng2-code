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
  public data: siteType[];
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
