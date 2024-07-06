import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateDiscussComponent } from './modal-create-discuss.component';

describe('ModalCreateDiscussComponent', () => {
  let component: ModalCreateDiscussComponent;
  let fixture: ComponentFixture<ModalCreateDiscussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateDiscussComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
