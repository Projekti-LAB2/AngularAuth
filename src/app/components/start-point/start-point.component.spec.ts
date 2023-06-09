import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPointComponent } from './start-point.component';

describe('StartPointComponent', () => {
  let component: StartPointComponent;
  let fixture: ComponentFixture<StartPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartPointComponent]
    });
    fixture = TestBed.createComponent(StartPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
