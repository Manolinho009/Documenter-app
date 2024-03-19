import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentationComponent } from './view-documentation.component';

describe('ViewDocumentationComponent', () => {
  let component: ViewDocumentationComponent;
  let fixture: ComponentFixture<ViewDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
