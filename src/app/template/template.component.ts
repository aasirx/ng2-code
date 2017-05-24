import { Component, OnInit } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public id: number;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.exampleData = this.service.getTemplateList();
    this.options = {
      templateResult: this.templateResult,
      templateSelection: this.templateSelection,
      templatereturn: this.templatereturn

    }
  }

  public templatereturn: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    var templateid = state[0].id;
    var textArr = [];

    jQuery("#" + templateid).click(function () {
      jQuery("#" + templateid + " input[type='checkbox']").change(function () {
        if (jQuery(this).is(':checked')) {
          let index = textArr.indexOf(jQuery(this).next().html());
          if (index == -1) {
            textArr.push(jQuery(this).next().html());
          }
        } else {
          let index = textArr.indexOf(jQuery(this).next().html());
          if(index != -1){
            textArr.splice(index,1);
          }
        }//.parent().prev()
        console.log(textArr)
      })
    })



    return jQuery('<span>' + state.text + '</span>');
  }
 
  // function for result template
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let label = '<span class="image"><input type="checkbox"  id="label_' + state.id + '">';


    return jQuery(label + '<label for="label_' + state.id + '">' + state.text + '</label></span>');
  }

  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    return jQuery('<span>' + state.text + '</span>');
  }


}
