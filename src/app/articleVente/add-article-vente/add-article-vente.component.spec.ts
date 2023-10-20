import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleVenteComponent } from './add-article-vente.component';

describe('AddArticleVenteComponent', () => {
  let component: AddArticleVenteComponent;
  let fixture: ComponentFixture<AddArticleVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
