import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiscussComponent } from './all-discuss.component';

describe('AllDiscussComponent', () => {
  let component: AllDiscussComponent;
  let fixture: ComponentFixture<AllDiscussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDiscussComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
