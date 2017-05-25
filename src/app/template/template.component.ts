import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @Input()
  public data: Array<Select2OptionData>;
  @Input()
  public selectName: string|"";//下拉框中的要显示的前缀的名称
  public options: Select2Options;
  public inputid: string;
  public textArr: string;
  public templateid: string;
  public textArr1 = []

  @Output() textChanges = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.options = {
      templateResult: this.templateResult,
      templateSelection: this.templateSelection,
      templatereturn: this.templatereturn,
      textcheckbox: this.textcheckbox
    }
  }
public textcheckbox: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if(this.templateid != undefined){
      console.log(jQuery("#"+this.inputid).html());
      console.dir(jQuery("#"+this.templateid))
    }
    return jQuery();
  }
  public templatereturn: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (state[0].id != undefined) {
      var templateid = state[0].id;
      this.templateid = templateid;
      var that = this;
      var temp = this.inputid;
      // console.dir(jQuery("#inputid"))
      jQuery("#" + templateid).click(function () {
        jQuery("#" + templateid + " input[type='checkbox']").change(function () {
          if (jQuery(this).is(':checked')) {
            let index = that.textArr1.indexOf(jQuery(this).next().html());
            if (index == -1) {
              that.textArr1.push(jQuery(this).next().html());
            }
          } else {
            let index = that.textArr1.indexOf(jQuery(this).next().html());
            if (index != -1) {
              that.textArr1.splice(index, 1);
            }
          }//.parent().prev()
          that.textArr = that.textArr1.join(",");
          jQuery("#"+temp).html(that.selectName+":"+that.textArr)
          jQuery("#"+temp).attr("title",that.textArr); 
          that.textChanges.emit(that.textArr);
        })
      })
    }else{
      this.inputid = state+"";
      // alert(this.id);
      // console.dir(jQuery("#"+this.id));
    }



    return jQuery('<span>' + state.text + '</span>');
  }

  // function for result template
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    
    let label = '<span class="image"><input type="checkbox"  id="label_' + state.id + '">';
    if(this.textArr != undefined){
      let texts = this.textArr.split(",");
      let index = texts.indexOf(state.text);
      if(index == -1){
        label = '<span class="image"><input type="checkbox"  id="label_' + state.id + '">';
      }else{
        label = '<span class="image"><input type="checkbox" checked="checked" id="label_' + state.id + '">';
      }
    }

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
