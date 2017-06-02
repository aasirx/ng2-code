import { DropdownSiteComponent } from './dropdown-site.component'
import { MultiSelectSearchSiteFilter } from './search-filter-site.pipe'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [DropdownSiteComponent, MultiSelectSearchSiteFilter],
  declarations: [DropdownSiteComponent, MultiSelectSearchSiteFilter],
})
export class MultiselectDropdownSiteModule { }
