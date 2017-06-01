import { MultiSelectSearchFilter } from '../dropdown/search-filter.pipe';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from '../dropdown/types';
import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { siteType } from '../dropdown-site/site-types'

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownSiteComponent),
  multi: true
};


@Component({
  selector: 'app-dropdown-site',
  templateUrl: './dropdown-site.component.html',
  styleUrls: ['./dropdown-site.component.css']
})
export class DropdownSiteComponent implements OnInit, OnChanges, DoCheck, ControlValueAccessor, Validator {
  @Input() options: Array<siteType>;
  optionsRight: Array<siteType>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Input() disabled: boolean = false;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() dropdownOpened = new EventEmitter();
  @Output() onAdded = new EventEmitter();
  @Output() onRemoved = new EventEmitter();


  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.isVisible) return;
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.element.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isVisible = false;
      this.dropdownClosed.emit();
    }
  }

  model: any[];
  isVisible: boolean = false;
  title: string;
  searchFilterText: string = '';
  isShowRightTable:boolean = false;
  numSelected: number = 0;
  differ: any;

  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-secondary',
    containerClasses: 'dropdown-inline',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    fixedTitle: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  defaultTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  constructor(private element: ElementRef,differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
   }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
  }
  //给每一行内容加一个手形的悬浮图标
  getItemStyle(option: IMultiSelectOption): any {
    if (!option.isLabel) {
      return { 'cursor': 'pointer' };
    }
  }
  //判断是否选中
  isSelected(option: siteType): boolean {
    return this.model && this.model.indexOf(option.sitename) > -1;
  }
  //清除搜索框的内容
  clearSearch(event: Event) {
    event.stopPropagation();
    this.searchFilterText = '';
  }
  //把左边选中项移动到右边
  turnRight() {
    this.optionsRight = [];
    if (this.model != null) {
      for (let i = 0; i < this.options.length; i++) {
        let index = this.model.indexOf(this.options[i].sitename);
        if (index > -1) {
          this.optionsRight.push(this.options[i]);
        }
      }
    }
  }

  setSelected(event: Event, option: siteType) {
      this.isShowRightTable = true;
    
    event.stopPropagation();
    if (!this.model) {
      this.model = [];
    }
    const index = this.model.indexOf(option.sitename);
    if (index > -1) {
      this.model.splice(index, 1);
      this.onRemoved.emit(option.sitename);
      // let childIds = this.options.filter(child => this.model.indexOf(child.sitename) > -1).map(child => child.sitename);
      //   this.model = this.model.filter(id => childIds.indexOf(id) < 0);
      //   childIds.forEach(childId => this.onRemoved.emit(childId));
    } else {
      if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
        this.model.push(option.sitename);
        this.onAdded.emit(option.sitename);
      } else {
        if (this.settings.autoUnselect) {
          this.model.push(option.sitename);
          this.onAdded.emit(option.sitename);
          const removedOption = this.model.shift();
          this.onRemoved.emit(removedOption);
        } else {
          this.selectionLimitReached.emit(this.model.length);
          return;
        }
      }
    }
    if (this.settings.closeOnSelect) {
      this.toggleDropdown();
    }
    this.model = this.model.slice();
    this.onModelChange(this.model);
    this.onModelTouched();
    if(this.model.length < 1){
      this.isShowRightTable = false;
      this.optionsRight = [];
    }
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = this.texts.defaultTitle || '';
  }

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.model = value;
    } else {
      this.model = [];
    }
  }

  validate(_c: AbstractControl): { [key: string]: any; } {
    return null;
  }
  registerOnChange(fn: Function): void {
  }

  registerOnTouched(fn: Function): void {
  }
  ngDoCheck() {
    const changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = this.options || [];
     
    }

    if (changes['texts'] && !changes['texts'].isFirstChange()) {
      this.updateTitle();
    }
  }

  updateNumSelected() {
    this.numSelected = 0;
  }
  updateTitle() {
    alert(1);
    if (this.numSelected === 0 || this.settings.fixedTitle) {
      this.title = this.texts.defaultTitle || '';
    } else if (this.settings.displayAllSelectedText && this.model.length === this.options.length) {
      this.title = this.texts.allSelected || '';
    } else if (this.settings.dynamicTitleMaxItems && this.settings.dynamicTitleMaxItems >= this.numSelected) {
      this.title = this.options
        .filter((option: siteType) =>
          this.model && this.model.indexOf(option.sitename) > -1
        )
        .map((option: siteType) => option.sitename)
        .join(', ');
    } else {
      this.title = this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }
  }
}
