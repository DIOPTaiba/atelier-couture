import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticleConfectionComponent } from './update-article-confection.component';

describe('UpdateArticleConfectionComponent', () => {
  let component: UpdateArticleConfectionComponent;
  let fixture: ComponentFixture<UpdateArticleConfectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArticleConfectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArticleConfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
