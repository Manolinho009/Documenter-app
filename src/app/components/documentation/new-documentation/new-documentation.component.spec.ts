import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocumentationComponent } from './new-documentation.component';

describe('NewDocumentationComponent', () => {
  let component: NewDocumentationComponent;
  let fixture: ComponentFixture<NewDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
