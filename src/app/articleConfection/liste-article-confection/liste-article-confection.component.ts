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
  styleUrls: ['./liste-article-confection.component.css'],
})

export class ListeArticleConfectionComponent implements OnInit {
  dropdownList = [];
  listeFournisseurs = [];
  // selectedItems = [];
  dropdownSettings!: IDropdownSettings;

  articlesConfection: ArticleConfection[] = [];
  fournisseursListe: Fournisseur[] = [];
  categoriesListe: Categorie[] = [];
  unitesListe: Unite[] = [];

  libelle!: string;
  quantite!: number;
  prix!: number;
  unite: number = 0;
  categorie: number = 0;

  uniteObjet: Unite = new Unite;
  categorieObjet: Categorie = new Categorie;

  fournisseursSelected = [];

  newArticleConfection: ArticleConfection = new ArticleConfection;
  editeArticleConfection: ArticleConfection = new ArticleConfection;

  formSubmitted: boolean = false;
  // Pour vérifer si c'est en mode édition
  isEditing = false;

  idArticleAEditer:number = 0;



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
    // this.fournisseursSelected = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];

    this.dropdownSettings = {
      searchPlaceholderText: 'Rechercher',
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Cochez tous',
      unSelectAllText: 'Décochez tous',
      noFilteredDataAvailablePlaceholderText: 'Aucun élément trouvé',
      noDataAvailablePlaceholderText: 'Aucun fournisseur',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  

  private load(){
    this.articleConfectionService.load().subscribe(response => {
      this.unitesListe = response.unites;
      this.categoriesListe = response.categories;
      this.fournisseursListe = response.fournisseurs;
      this.articlesConfection = response.articleConfections;
      // this.categorie = this.categories[0].id;
      response.fournisseurs.forEach((fournisseur: { id: any; name: any; }) => {
              return this.listeFournisseurs.push({ item_id: fournisseur.id, item_text: fournisseur.name });
            });
            this.dropdownList = this.listeFournisseurs;
    
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.uniteObjet.id = this.unite;
    this.categorieObjet.id = this.categorie;

    // on vérifie si on est en mode édition ou pas
    // mode création
    if(!this.isEditing){

      this.newArticleConfection.libelle = this.libelle;
      this.newArticleConfection.qteStock = this.quantite;
      this.newArticleConfection.prix = this.prix;
      this.newArticleConfection.unite = this.uniteObjet;
      this.newArticleConfection.categorie = this.categorieObjet;
      this.newArticleConfection.fournisseurs = this.fournisseursSelected;

      this.articleConfectionService.storeArticleConfection(this.newArticleConfection).subscribe((response) => {
        // mise à jour la liste des articles dans le tableau
        this.articlesConfection.unshift(response);
      });
    }
    // mode édition
    else{

      this.editeArticleConfection.libelle = this.libelle;
      this.editeArticleConfection.qteStock = this.quantite;
      this.editeArticleConfection.prix = this.prix;
      this.editeArticleConfection.unite = this.uniteObjet;
      this.editeArticleConfection.categorie = this.categorieObjet;
      this.editeArticleConfection.fournisseurs = this.fournisseursSelected;

      console.log(this.editeArticleConfection);

      // envoie requête de mise à jour
      this.articleConfectionService.updateArticleConfection(this.idArticleAEditer,this.editeArticleConfection).subscribe((response) => {
        this.load();
      });
    }

    // Réinitialisation du formulaire
    this.libelle = '';
    this.quantite = null;
    this.prix = null;
    this.unite = 0; // Remettre à l'option par défaut
    this.categorie = 0; // Remettre à l'option par défaut
    this.fournisseursSelected = [];
    console.log('Fournisseurs sélectionnés après réinitialisation :', this.fournisseursSelected);
  
      // this.fournisseursSelected = items
      // console.log(this.fournisseursSelected);
    
    this.formSubmitted = false; // Réinitialiser la soumission du formulaire
  }

  storeArticleConfection(articleConfection: ArticleConfection){
    this.articleConfectionService.storeArticleConfection(articleConfection).subscribe();
  }


  articleConfectionDetails(id: number){
    this.router.navigate(['article-confection-details', id]);
  }

  editArticleConfection(articleId: number) {
    // Récupère l'article dans la liste en fonction de son id
    const articleAEdit = this.articlesConfection.find(article => article.id === articleId);
    if (articleAEdit) {
        this.isEditing = true; // Passez en mode édition
        this.idArticleAEditer = articleId;
        this.libelle = articleAEdit.libelle;
        this.quantite = articleAEdit.qteStock;
        this.prix = articleAEdit.prix;
        this.unite = articleAEdit.unite.id;
        this.categorie = articleAEdit.categorie.id;
        for (let i = 0; i < articleAEdit.fournisseurs.length; i++) {
          this.fournisseursSelected.push(articleAEdit.fournisseurs[i].id)
        }
        // this.fournisseursSelected = articleAEdit.fournisseurs;
        console.log(articleAEdit);
        console.log(this.fournisseursSelected);
    }
}


  deleteArticleConfection(id: number){
    this.articleConfectionService.deleteArticleConfection(id).subscribe( data => {
      console.log(id);
      // this.getArticleConfections();
      this.load();
    })
  }

  // Gestionnaires d'événements de sélection fournisseurs
  onItemSelect(item: any) {
    this.fournisseursSelected.push(item.item_id)
      console.log(item);
      console.log(this.fournisseursSelected);
    }
    onSelectAll(items: any) {
      this.fournisseursSelected = [];
      for (let i = 0; i < items.length; i++) {
        this.fournisseursSelected.push(items[i].item_id)
      }
      console.log(this.fournisseursSelected);
    }
    onItemDeSelect(item: any) {
      this.fournisseursSelected = this.fournisseursSelected.filter(fournisseur => fournisseur !== item.item_id);
      console.log(this.fournisseursSelected);
    }
    onDeSelectAll(items: any) {
      this.fournisseursSelected = items
      console.log(this.fournisseursSelected);
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
