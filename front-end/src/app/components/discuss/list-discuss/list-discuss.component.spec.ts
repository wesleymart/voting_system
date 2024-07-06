import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiscussComponent } from './list-discuss.component';

describe('ListDiscussComponent', () => {
  let component: ListDiscussComponent;
  let fixture: ComponentFixture<ListDiscussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiscussComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
