import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeArticleVenteComponent } from './liste-article-vente.component';

describe('ListeArticleVenteComponent', () => {
  let component: ListeArticleVenteComponent;
  let fixture: ComponentFixture<ListeArticleVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeArticleVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeArticleVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
