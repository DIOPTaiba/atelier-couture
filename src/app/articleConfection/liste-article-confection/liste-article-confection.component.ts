
import { ArticleConfection } from '../../models/article-confection';
import { ArticleConfectionService } from '../../services/article-confection.service';

@Component({
  selector: 'app-liste-article-confection',
  templateUrl: './liste-article-confection.component.html',
  styleUrls: ['./liste-article-confection.component.css']
})
export class ListeArticleConfectionComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  articlesConfection: ArticleConfection[] = [];
  // myForm!: FormGroup;
  // cities: Array<any> = [];
  // disabled = false;
  // ShowFilter = false;
  // limitSelection = false;

  constructor(private fb: FormBuilder, private articleConfectionService: ArticleConfectionService, private router: Router) { }

  ngOnInit(): void {
    this.getArticleConfections();

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  //   this.cities = [
  //     { id: 1, name: 'New Delhi' },
  //     { id: 2, name: 'Mumbai' ,zone:'',categories:[]},
  //     { id: 3, name: 'Bangalore' ,zone:'',categories:[]},
  //     { id: 4, name: 'Pune' ,zone:'',categories:[]},
  //     { id: 5, name: 'Chennai' ,zone:'',categories:[]},
  //     { id: 6, name: 'Navsari' ,zone:'',categories:[]}
  //   ];
  //   this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'item_id',
  //     textField: 'item_text',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 3,
  //     allowSearchFilter: this.ShowFilter
  // };
  //   this.myForm = this.fb.group({
  //     city: [this.selectedItems]
  //   });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  // onItemSelect(item: any) {
  //           console.log('onItemSelect', item);
  //       }
  //       onSelectAll(items: any) {
  //           console.log('onSelectAll', items);
  //       }
  //       toogleShowFilter() {
  //           this.ShowFilter = !this.ShowFilter;
  //           this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  //       }

  //       handleLimitSelection() {
  //           if (this.limitSelection) {
  //               this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
  //           } else {
  //               this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
  //           }
  //       }

  private getArticleConfections(){
    this.articleConfectionService.getArticleConfectionListe().subscribe(response => {
      this.articlesConfection = response.content;
      // if (response) {
      //   this.articlesConfection = response._embedded.articleConfectionResponses;
      // } else {
      //   console.error('Les données ne sont pas dans le format attendu.', response);
      // }
    });
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
      this.getArticleConfections();
    })
  }


}
