import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundErrorComponent } from './found-error.component';

describe('FoundErrorComponent', () => {
  let component: FoundErrorComponent;
  let fixture: ComponentFixture<FoundErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
