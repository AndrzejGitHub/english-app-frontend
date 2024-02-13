import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyModalComponent } from './vocabulary-modal.component';

describe('VocabularyModalComponent', () => {
  let component: VocabularyModalComponent;
  let fixture: ComponentFixture<VocabularyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VocabularyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabularyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
