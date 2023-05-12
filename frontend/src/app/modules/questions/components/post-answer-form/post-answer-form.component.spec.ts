import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnswerFormComponent } from './post-answer-form.component';

describe('PostAnswerFormComponent', () => {
  let component: PostAnswerFormComponent;
  let fixture: ComponentFixture<PostAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAnswerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
