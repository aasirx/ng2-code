import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Select2Module } from 'ng2-select2';
import { TemplateComponent } from './template/template.component';
import { DataService } from './services/data.service';
import { SiteComponent } from './site/site.component';
import { MultiselectDropdownModule } from './dropdown/dropdown.module';
import { MultiselectDropdownSiteModule } from './dropdown-site/dropdown-site.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    SiteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Select2Module,
    MultiselectDropdownModule,
    MultiselectDropdownSiteModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
