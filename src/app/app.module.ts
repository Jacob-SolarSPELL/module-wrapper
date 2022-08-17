import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { FilesComponent } from './files/files.component';
import { FileViewComponent } from './file-view/file-view.component';

import { DataTablesModule } from 'angular-datatables';
import { SearchAllComponent } from './search-all/search-all.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    SubcategoryComponent,
    FilesComponent,
    FileViewComponent,
    SearchAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
