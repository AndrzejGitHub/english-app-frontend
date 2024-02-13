import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabularyFormComponent } from './add-vocabulary-form.component';

describe('AddVocabularyFormComponent', () => {
  let component: AddVocabularyFormComponent;
  let fixture: ComponentFixture<AddVocabularyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVocabularyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVocabularyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
