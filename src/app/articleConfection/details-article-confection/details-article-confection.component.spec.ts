import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArticleConfectionComponent } from './details-article-confection.component';

describe('DetailsArticleConfectionComponent', () => {
  let component: DetailsArticleConfectionComponent;
  let fixture: ComponentFixture<DetailsArticleConfectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsArticleConfectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsArticleConfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
