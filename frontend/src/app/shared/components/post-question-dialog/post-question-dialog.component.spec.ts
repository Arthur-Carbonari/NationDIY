import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQuestionDialogComponent } from './post-question-dialog.component';

describe('PostQuestionDialogComponent', () => {
  let component: PostQuestionDialogComponent;
  let fixture: ComponentFixture<PostQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostQuestionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
