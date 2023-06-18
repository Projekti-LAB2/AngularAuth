import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStartPointComponent } from './create-start-point.component';

describe('CreateStartPointComponent', () => {
  let component: CreateStartPointComponent;
  let fixture: ComponentFixture<CreateStartPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStartPointComponent]
    });
    fixture = TestBed.createComponent(CreateStartPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
