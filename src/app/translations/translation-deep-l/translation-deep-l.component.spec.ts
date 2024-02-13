import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationDeepLComponent } from './translation-deep-l.component';

describe('TranslationDeepLComponent', () => {
  let component: TranslationDeepLComponent;
  let fixture: ComponentFixture<TranslationDeepLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationDeepLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationDeepLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
