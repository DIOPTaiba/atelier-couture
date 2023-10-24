import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { ArticleConfection } from '../../models/article-confection';
import { ArticleConfectionService } from '../../services/article-confection.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/models/forunisseur';
import { Categorie } from 'src/app/models/categorie';
import { Unite } from 'src/app/models/unite';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, map, startWith} from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';

// Pour utiliser jQuery
declare var $: any;

@Component({
  selector: 'app-liste-article-confection',
  templateUrl: './liste-article-confection.component.html',
  styleUrls: ['./liste-article-confection.component.css'],

  // standalone: true,
  // imports: [
  //   FormsModule,
  //   // MatFormFieldModule,
  //   // MatChipsModule,
  //   NgFor,
  //   // MatIconModule,
  //   // MatAutocompleteModule,
  //   ReactiveFormsModule,
  //   AsyncPipe,
  // ],
})

export class ListeArticleConfectionComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private articleConfectionService: ArticleConfectionService, private router:Router) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
      );
     }                                                                    

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


  articleConfectionListe: ArticleConfection[] = [];
  // articlesConfection: ArticleConfection[];
  
  

  // displayedColumns: string[] = ['reference', 'libelle', 'qteStock', 'categorie','actions'];
  // dataSource = new MatTableDataSource<any>(this.articleConfectionListe);
  // dataSource = new MatTableDataSource<ArticleConfection>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings!: IDropdownSettings;
  listeFournisseursIdName = [];
  fournisseursSelected = [];

  // articleConfectionListe: ArticleConfection[] = [];
  fournisseursListe: Fournisseur[] = [];
  categoriesListe: Categorie[] = [];
  unitesListe: Unite[] = [];
  

  libelle!: string;
  quantite!: number;
  prix!: number;
  reference!: string;
  unite: number = 0;
  categorie: number = 0;
  tableauFournisseurs=[];

  uniteObjet: Unite = new Unite;
  categorieObjet: Categorie = new Categorie;

  
  newArticleConfection: ArticleConfection = new ArticleConfection;
  editeArticleConfection: ArticleConfection = new ArticleConfection;

  formSubmitted: boolean = false;
  // Pour vérifer si c'est en mode édition
  isEditing = false;
  idArticleAEditer:number = 0;

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.getArticleConfections();
    this.load();    

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

  ngAfterViewInit() {
    $(document).ready(function() {
      const table = $('#myTable').DataTable();
      this.data.forEach(item => {
        table.row.add(item).draw(false);
      });
    });
  }

  private load(){
    this.articleConfectionService.load().subscribe(response => {
      this.unitesListe = response.unites;
      this.categoriesListe = response.categories;
      this.fournisseursListe = response.fournisseurs;
      this.articleConfectionListe = response.articleConfections;
      // this.dataSource.data = this.articleConfectionListe;
      // this.categorie = this.categories[0].id;
      response.fournisseurs.forEach((fournisseur: { id: any; name: any; }) => {
              return this.listeFournisseursIdName.push({ item_id: fournisseur.id, item_text: fournisseur.name });
            });
      this.dropdownList = this.listeFournisseursIdName;
      // this.fournisseursSelected = [
      //   {item_id: 1, item_text: 'Modou xxx'},
      //   {item_id: 2, item_text: 'Issa Diop'}
      // ];
    
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
      this.tableauFournisseurs = this.fournisseursSelected.map(item => item.item_id);
      this.newArticleConfection.fournisseurs = this.tableauFournisseurs;
      console.log(this.fournisseursSelected);
      console.log(this.tableauFournisseurs);

      this.articleConfectionService.storeArticleConfection(this.newArticleConfection).subscribe((response) => {
        // mise à jour la liste des articles dans le tableau
        this.articleConfectionListe.unshift(response);
      });
    }
    // mode édition
    else{

      this.editeArticleConfection.libelle = this.libelle;
      this.editeArticleConfection.qteStock = this.quantite;
      this.editeArticleConfection.reference = this.reference;
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
    this.reference = '';
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


  // articleConfectionDetails(id: number){
  //   this.router.navigate(['article-confection-details', id]);
  // }

  editArticleConfection(articleId: number) {
    // Récupère l'article dans la liste en fonction de son id
    const articleAEdit = this.articleConfectionListe.find(article => article.id === articleId);
    if (articleAEdit) {
       // Passez en mode édition
        this.isEditing = true;
        this.idArticleAEditer = articleId;
        this.libelle = articleAEdit.libelle;
        this.quantite = articleAEdit.qteStock;
        this.reference = articleAEdit.reference;
        this.prix = articleAEdit.prix;
        this.unite = articleAEdit.unite.id;
        this.categorie = articleAEdit.categorie.id;
        this.listeFournisseursIdName = [];
        articleAEdit.fournisseurs.forEach((fournisseur: { id: any; name: any; }) => {
          return this.listeFournisseursIdName.push({ item_id: fournisseur.id, item_text: fournisseur.name });
        });
        // On vide le tableau des fourisseurs sélectionnés et on charge les fournisseurs de l'article à éditer
        this.fournisseursSelected = [] ;
        this.fournisseursSelected = this.listeFournisseursIdName;
          
        // for (let i = 0; i < articleAEdit.fournisseurs.length; i++) {
        //   this.fournisseursSelected.push(articleAEdit.fournisseurs[i].id)
        // }
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
