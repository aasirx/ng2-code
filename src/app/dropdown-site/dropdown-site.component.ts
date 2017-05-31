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

  isVisible: boolean = false;
  title: string;
  searchFilterText: string = '';

  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
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

  constructor(private element: ElementRef) { }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = this.texts.defaultTitle || '';
  }

  writeValue(value: any): void {
    
  }

  validate(_c: AbstractControl): { [key: string]: any; } {
    return null;
  }
  registerOnChange(fn: Function): void {
  }

  registerOnTouched(fn: Function): void {
  }
  ngDoCheck() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
