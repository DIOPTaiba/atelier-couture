import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleConfectionComponent } from './articleConfection/add-article-confection/add-article-confection.component';
import { ListeArticleVenteComponent } from './articleVente/liste-article-vente/liste-article-vente.component';
import { ListeArticleConfectionComponent } from './articleConfection/liste-article-confection/liste-article-confection.component';

// On déclare les routes
const routes: Routes = [
	{path: "articleconfections", component: ListeArticleConfectionComponent},
	{path: "", redirectTo: "articleconfections", pathMatch: "full" },
	{path: "articleventes", component: ListeArticleVenteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
