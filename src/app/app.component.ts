import { Component, Input, OnInit } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from './services/data.service';
import * as jQuery from 'jquery';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: Array<Select2OptionData>;
  public selectName: string = "NE";
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  onTextChanges(value) {
    // console.log("value:"+value)
  }
  constructor(private service: DataService) { }
  ngOnInit() {
    this.data = this.service.getTemplateList();
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
  }
  onChange() {
        console.log(this.optionsModel);
    }

}
