import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleConfectionComponent } from './articleConfection/add-article-confection/add-article-confection.component';
import { UpdateArticleConfectionComponent } from './update-article-confection/update-article-confection.component';
import { DetailsArticleConfectionComponent } from './articleConfection/details-article-confection/details-article-confection.component';
import { ListeArticleConfectionComponent } from './articleConfection/liste-article-confection/liste-article-confection.component';
import { ListeArticleVenteComponent } from './articleVente/liste-article-vente/liste-article-vente.component';
import { AddArticleVenteComponent } from './articleVente/add-article-vente/add-article-vente.component';
import { DetailsArticleVenteComponent } from './articleVente/details-article-vente/details-article-vente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleConfectionComponent,
    UpdateArticleConfectionComponent,
    DetailsArticleConfectionComponent,
    ListeArticleConfectionComponent,
    ListeArticleVenteComponent,
    AddArticleVenteComponent,
    DetailsArticleVenteComponent
  ],
  imports: [
    BrowserModule
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
