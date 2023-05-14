import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentExpansionComponent } from './post-comment-expansion.component';

describe('PostCommentExpansionComponent', () => {
  let component: PostCommentExpansionComponent;
  let fixture: ComponentFixture<PostCommentExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentExpansionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
