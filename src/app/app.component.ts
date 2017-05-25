import { Component, Input, OnInit } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from './services/data.service';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: Array<Select2OptionData>;
  public selectName:string = "NE";

  onTextChanges(value) {
    // console.log("value:"+value)
  }
  constructor(private service: DataService) { }
  ngOnInit() {
    this.data = this.service.getTemplateList()
  }
}
