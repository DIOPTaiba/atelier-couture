import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArticleVenteComponent } from './details-article-vente.component';

describe('DetailsArticleVenteComponent', () => {
  let component: DetailsArticleVenteComponent;
  let fixture: ComponentFixture<DetailsArticleVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsArticleVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsArticleVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
