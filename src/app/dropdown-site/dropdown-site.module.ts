import { DropdownSiteComponent } from './dropdown-site.component'
import { MultiSelectSearchSiteFilter } from './search-filter-site.pipe'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZenapSmartTableModule } from 'zenap-smart-table/zenap-smart-table';
import { SiteTableComponent } from './site-table/site-table.component';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [CommonModule, FormsModule, NgbModule,ZenapSmartTableModule],
  exports: [DropdownSiteComponent, MultiSelectSearchSiteFilter],
  declarations: [DropdownSiteComponent, MultiSelectSearchSiteFilter, SiteTableComponent],
  providers: [NgbPaginationConfig]
})
export class MultiselectDropdownSiteModule { }
