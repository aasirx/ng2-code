import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Select2Module } from 'ng2-select2';
import { TemplateComponent } from './template/template.component';
import { DataService } from './services/data.service';
@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Select2Module
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
