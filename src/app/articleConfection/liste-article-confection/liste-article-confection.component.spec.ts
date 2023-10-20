import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeArticleConfectionComponent } from './liste-article-confection.component';

describe('ListeArticleConfectionComponent', () => {
  let component: ListeArticleConfectionComponent;
  let fixture: ComponentFixture<ListeArticleConfectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeArticleConfectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeArticleConfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
