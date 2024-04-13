import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcedureComponent } from './edit-procedure.component';

describe('EditProcedureComponent', () => {
  let component: EditProcedureComponent;
  let fixture: ComponentFixture<EditProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
