import { Component, OnInit } from '@angular/core';
import { ArticleConfection } from '../../models/article-confection';
import { ArticleConfectionService } from '../../services/article-confection.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/models/forunisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Categorie } from 'src/app/models/categorie';
import { Unite } from 'src/app/models/unite';


@Component({
  selector: 'app-liste-article-confection',
  templateUrl: './liste-article-confection.component.html',
  styleUrls: ['./liste-article-confection.component.css']
})
export class ListeArticleConfectionComponent implements OnInit {
  dropdownList = [];
  listeFournisseurs = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  articlesConfection: ArticleConfection[] = [];
  fournisseurs: Fournisseur[] = [];
  categories: Categorie[] = [];
  unites: Unite[] = [];

  libelle: string;
  quantite: number;
  formSubmitted: boolean = false;

  constructor(private articleConfectionService: ArticleConfectionService,private fournisseurService: FournisseurService, private router:Router) { }

  ngOnInit(): void {
    // this.getArticleConfections();
    this.load();
    // this.getFournisseurs();

    
    // this.dropdownList = [
    //   { item_id: 1, item_text:  'OP1' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Cochez tous',
      unSelectAllText: 'Décochez tous',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  
  

  private load(){
    this.articleConfectionService.load().subscribe(response => {
      this.unites = response.unites;
      this.categories = response.categories;
      this.fournisseurs = response.fournisseurs;
      this.articlesConfection = response.articleConfections;
      response.fournisseurs.forEach(fournisseur => {
              this.listeFournisseurs.push({ item_id: fournisseur.id, item_text: fournisseur.name });
            });
            this.dropdownList = this.listeFournisseurs;
    
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    // Autres opérations de soumission du formulaire ici
  }

  articleConfectionDetails(id: number){
    this.router.navigate(['article-confection-details', id]);
  }

  updateArticleConfection(id: number){
    this.router.navigate(['update-article-confection', id]);
  }

  deleteArticleConfection(id: number){
    this.articleConfectionService.deleteArticleConfection(id).subscribe( data => {
      console.log(data);
      console.log(id);
      // this.getArticleConfections();
      this.load();
    })
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item)
      console.log(item);
      console.log(this.selectedItems);
    }
    
    onSelectAll(items: any) {
      this.selectedItems = items
      console.log(items);
      console.log(this.selectedItems);
    }
  
    // private getFournisseurs(){
    //   this.fournisseurService.getFournisseurListe().subscribe(response => {
    //     this.fournisseurs = response;
    //     // console.log(this.fournisseurs);
    //     this.fournisseurs.forEach(fournisseur => {
    //       this.listeFournisseurs.push({ item_id: fournisseur.id, item_text: fournisseur.name });
    //     });
    //     this.dropdownList = this.listeFournisseurs;
    //   });
    // }
  
    // private getArticleConfections(){
    //   this.articleConfectionService.getArticleConfectionListe().subscribe(response => {
    //     this.articlesConfection = response.content;
    //      // if (response) {
    //     //   this.articlesConfection = response._embedded.articleConfectionResponses;
    //     // } else {
    //     //   console.error('Les données ne sont pas dans le format attendu.', response);
    //     // }
    //   });
    // }


}
